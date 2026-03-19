import { initTheme } from './theme.js';
import { progress } from './progress.js';

const app = document.getElementById('app');
let scenarioLoader = null;
let currentTerminal = null;
let currentGuidePanel = null;

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function getLoader() {
  if (!scenarioLoader) {
    const mod = await import('./scenario-loader.js?v=2');
    scenarioLoader = mod.loader;
  }
  return scenarioLoader;
}

// --- Router ---
function getRoute() {
  const hash = location.hash.slice(1) || '/';
  if (hash === '/') return { view: 'home' };
  const scenarioMatch = hash.match(/^\/scenario\/([^/]+)$/);
  if (scenarioMatch) return { view: 'scenario', id: scenarioMatch[1] };
  const completeMatch = hash.match(/^\/scenario\/([^/]+)\/complete$/);
  if (completeMatch) return { view: 'complete', id: completeMatch[1] };
  return { view: 'home' };
}

function cleanup() {
  if (currentTerminal) { currentTerminal.destroy(); currentTerminal = null; }
  if (currentGuidePanel) { currentGuidePanel = null; }
}

async function navigate() {
  cleanup();
  const route = getRoute();
  app.innerHTML = '';

  switch (route.view) {
    case 'home':
      await renderHome();
      break;
    case 'scenario':
      await renderScenario(route.id);
      break;
    case 'complete':
      await renderComplete(route.id);
      break;
    default:
      location.hash = '#/';
  }
}

// --- Filter State ---
let activeFilter = 'all';

function getAudienceLabel(audience) {
  switch (audience) {
    case 'dev': return '개발자';
    case 'designer': return '디자이너';
    case 'non-dev': return '비개발자';
    default: return '전체';
  }
}

function getDifficultyStars(level) {
  return '★'.repeat(level) + '☆'.repeat(3 - level);
}

// --- Home View ---
async function renderHome() {
  const filterGroup = document.getElementById('filter-group');
  if (filterGroup) filterGroup.style.display = 'flex';

  const loader = await getLoader();
  const completedCount = progress.getCompletedCount();
  const totalCount = 38;
  const pct = Math.round(completedCount / totalCount * 100);

  app.innerHTML = `
    <div class="home-view">
      <div class="progress-bar-container" role="progressbar" aria-valuenow="${completedCount}" aria-valuemax="${totalCount}" aria-label="학습 진행률: ${completedCount}/${totalCount} 완료">
        <span class="progress-text">${completedCount} / ${totalCount} 완료</span>
        <div class="progress-bar" style="width: ${pct}%"></div>
      </div>
      <div id="home-content">
        <p class="loading-text">시나리오를 불러오는 중...</p>
      </div>
      <footer class="sources">
        <p class="sources-title">학습 컨텐츠 출처</p>
        <ul>
          <li><a href="https://anthropic.skilljar.com/claude-code-in-action" target="_blank" rel="noopener">Claude Code in Action — Anthropic Skilljar</a></li>
          <li><a href="https://code.claude.com/docs/ko/best-practices" target="_blank" rel="noopener">Claude Code Best Practices</a></li>
          <li><a href="https://claude.com/resources/use-cases" target="_blank" rel="noopener">Claude Use Cases — Anthropic</a></li>
          <li><a href="https://code.claude.com/docs/ko/checkpointing" target="_blank" rel="noopener">Claude Code Checkpointing</a></li>
          <li><a href="https://code.claude.com/docs/ko/github-actions" target="_blank" rel="noopener">Claude Code GitHub Actions</a></li>
        </ul>
      </footer>
    </div>
  `;

  try {
    const manifest = await loader.getManifest();
    const scenarios = activeFilter === 'all'
      ? manifest.scenarios
      : manifest.scenarios.filter(s => s.audience === activeFilter || s.audience === 'all');

    renderScenarioGrid(scenarios);
  } catch (e) {
    const content = document.getElementById('home-content');
    content.innerHTML = `
      <div class="error-view">
        <p>시나리오를 불러올 수 없습니다.</p>
        <button class="btn btn-primary" id="retry-btn">다시 시도</button>
      </div>
    `;
    document.getElementById('retry-btn')?.addEventListener('click', () => location.reload());
  }
}

function renderScenarioGrid(scenarios) {
  const content = document.getElementById('home-content');
  if (!content) return;

  const chapters = {};
  for (const s of scenarios) {
    const key = s.chapter;
    if (!chapters[key]) chapters[key] = { title: s.chapterTitle || `Ch${key}`, items: [] };
    chapters[key].items.push(s);
  }

  const completedIds = progress.getCompletedIds();
  const position = progress.getPosition();

  let html = '';
  for (const [ch, group] of Object.entries(chapters)) {
    html += `<div class="chapter-group">`;
    html += `<div class="chapter-title">Ch${ch}. ${escapeHtml(group.title)}</div>`;
    html += `<div class="home-grid">`;
    for (const s of group.items) {
      const isCompleted = completedIds.includes(s.id);
      const isCurrent = position.scenarioId === s.id;
      const statusClass = isCompleted ? 'completed' : isCurrent ? 'in-progress' : '';
      const statusText = isCompleted ? '✓ 완료' : isCurrent ? '▶ 진행중' : '○ 미시작';
      const statusCss = isCompleted ? 'done' : isCurrent ? 'current' : 'pending';

      html += `
        <div class="scenario-card ${statusClass}" data-scenario-id="${s.id}" tabindex="0" role="button" aria-label="${escapeHtml(s.title)}">
          <div class="card-difficulty">${getDifficultyStars(s.difficulty)}</div>
          <h3 class="card-title">${escapeHtml(s.title)}</h3>
          <div class="card-meta">
            <span class="card-audience">${getAudienceLabel(s.audience)}</span>
            <span>${s.estimatedMinutes}분</span>
          </div>
          <div class="card-status ${statusCss}">${statusText}</div>
        </div>
      `;
    }
    html += `</div></div>`;
  }

  content.innerHTML = html;

  content.addEventListener('click', e => {
    const card = e.target.closest('.scenario-card');
    if (card) location.hash = `#/scenario/${card.dataset.scenarioId}`;
  });
  content.addEventListener('keydown', e => {
    const card = e.target.closest('.scenario-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      location.hash = `#/scenario/${card.dataset.scenarioId}`;
    }
  });
}

// --- Scenario View ---
async function renderScenario(id) {
  const filterGroup = document.getElementById('filter-group');
  if (filterGroup) filterGroup.style.display = 'none';

  const loader = await getLoader();

  app.innerHTML = `
    <div class="scenario-view">
      <div class="scenario-header">
        <a href="#/" class="back-link">← 홈</a>
        <h2 class="scenario-title">불러오는 중...</h2>
      </div>
      <div class="scenario-body">
        <div class="terminal-container" id="terminal-container">
          <div class="terminal"><div class="terminal-loading"><span class="cursor-blink">█</span></div></div>
        </div>
        <button class="guide-toggle" id="guide-toggle">가이드 보기</button>
        <div class="guide-container" id="guide-container"></div>
      </div>
    </div>
  `;

  let scenario;
  try {
    scenario = await loader.getScenario(id);
  } catch {
    scenario = null;
  }

  if (!scenario) {
    app.innerHTML = `
      <div class="error-view">
        <p>시나리오를 찾을 수 없습니다.</p>
        <a href="#/" class="btn btn-primary">홈으로</a>
      </div>
    `;
    return;
  }

  document.querySelector('.scenario-title').textContent = scenario.title;

  const guideToggle = document.getElementById('guide-toggle');
  const guideContainer = document.getElementById('guide-container');
  if (guideToggle) {
    guideToggle.addEventListener('click', () => {
      guideContainer.classList.toggle('collapsed');
      guideToggle.textContent = guideContainer.classList.contains('collapsed') ? '가이드 보기' : '가이드 숨기기';
    });
  }

  const [terminalMod, guideMod] = await Promise.all([
    import('./terminal.js?v=2'),
    import('./guide-panel.js?v=2')
  ]);

  const termContainer = document.getElementById('terminal-container');
  termContainer.innerHTML = '';
  const terminal = new terminalMod.Terminal(termContainer);
  currentTerminal = terminal;

  const guide = new guideMod.GuidePanel(guideContainer);
  currentGuidePanel = guide;
  guide.setTotalSteps(scenario.steps.length);

  progress.startTimer(id);

  let stepIndex = 0;
  const steps = scenario.steps;

  async function runNextStep() {
    if (stepIndex >= steps.length) {
      progress.markCompleted(id);
      location.hash = `#/scenario/${id}/complete`;
      return;
    }

    const step = steps[stepIndex];
    progress.savePosition(id, stepIndex);

    if (step.type === 'narration') {
      await guide.showNarration(step, stepIndex);
      stepIndex++;
      runNextStep();
      return;
    }

    if (step.type === 'guide') {
      await guide.showGuide(step, stepIndex);
      stepIndex++;
      runNextStep();
      return;
    }

    if (step.type === 'checkpoint') {
      await guide.showCheckpoint(step, stepIndex);
      stepIndex++;
      runNextStep();
      return;
    }

    await terminal.runStep(step);
    stepIndex++;
    runNextStep();
  }

  runNextStep();
}

// --- Complete View ---
async function renderComplete(id) {
  const filterGroup = document.getElementById('filter-group');
  if (filterGroup) filterGroup.style.display = 'none';

  const loader = await getLoader();
  const manifest = await loader.getManifest();
  const scenario = manifest.scenarios.find(s => s.id === id);
  const next = await loader.getNextScenario(id);
  const elapsed = progress.formatTime(progress.getLastElapsed());

  app.innerHTML = `
    <div class="complete-view">
      <div class="complete-icon" aria-hidden="true">✓</div>
      <h2 class="complete-title">시나리오 완료!</h2>
      <p class="complete-scenario">"${escapeHtml(scenario?.title || id)}"을 완료했습니다</p>
      <p class="complete-time">소요 시간: ${elapsed}</p>
      <div class="complete-actions">
        ${next ? `<a href="#/scenario/${next.id}" class="btn btn-primary">다음: ${escapeHtml(next.title)} →</a>` : ''}
        <a href="#/" class="btn btn-secondary">홈으로</a>
      </div>
    </div>
  `;
}

// --- Filter Buttons ---
function initFilters() {
  const group = document.getElementById('filter-group');
  if (!group) return;
  group.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    group.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    activeFilter = btn.dataset.filter;
    const route = getRoute();
    if (route.view === 'home') renderHome();
  });
}

// --- Storage Banner ---
function checkStorage() {
  if (!progress.isAvailable()) {
    const banner = document.createElement('div');
    banner.className = 'storage-banner';
    banner.setAttribute('role', 'alert');
    banner.textContent = '프라이빗 모드에서는 진행 상태가 저장되지 않습니다.';
    document.body.insertBefore(banner, document.body.firstChild);
  }
}

// --- Init ---
window.addEventListener('hashchange', navigate);
initTheme();
initFilters();
checkStorage();
navigate();

export { navigate };
