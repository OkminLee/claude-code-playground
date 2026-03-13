const STORAGE_KEY = 'ccp-progress';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completedScenarios: [], currentScenario: null, currentStep: 0 };
  } catch {
    return { completedScenarios: [], currentScenario: null, currentStep: 0 };
  }
}

function save(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export const progress = {
  isCompleted(id) {
    return load().completedScenarios.includes(id);
  },

  startTimer(scenarioId) {
    const state = load();
    state.startTime = Date.now();
    state.currentScenario = scenarioId;
    save(state);
  },

  getElapsedTime() {
    const state = load();
    if (!state.startTime) return 0;
    return Date.now() - state.startTime;
  },

  formatTime(ms) {
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const rem = sec % 60;
    return min > 0 ? `${min}분 ${rem}초` : `${rem}초`;
  },

  markCompleted(id) {
    const state = load();
    if (!state.completedScenarios.includes(id)) {
      state.completedScenarios.push(id);
    }
    state.lastElapsed = this.getElapsedTime();
    state.currentScenario = null;
    state.currentStep = 0;
    state.startTime = null;
    save(state);
  },

  getLastElapsed() {
    return load().lastElapsed || 0;
  },

  savePosition(scenarioId, stepIndex) {
    const state = load();
    state.currentScenario = scenarioId;
    state.currentStep = stepIndex;
    save(state);
  },

  getPosition() {
    const state = load();
    return { scenarioId: state.currentScenario, step: state.currentStep };
  },

  getCompletedCount() {
    return load().completedScenarios.length;
  },

  getCompletedIds() {
    return load().completedScenarios;
  },

  reset() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  },

  isAvailable() {
    try { localStorage.setItem('_test', '1'); localStorage.removeItem('_test'); return true; } catch { return false; }
  }
};
