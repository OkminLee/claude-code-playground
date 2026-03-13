function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export class GuidePanel {
  constructor(container) {
    this.container = container;
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-label', '학습 가이드');
    this.totalSteps = 0;
    this.currentStep = 0;
  }

  setTotalSteps(total) {
    this.totalSteps = total;
  }

  showNarration(step, stepIndex) {
    this.currentStep = stepIndex;
    return new Promise(resolve => {
      this.container.innerHTML = `
        <div class="guide-step-indicator">Step ${stepIndex + 1} / ${this.totalSteps}</div>
        <div class="guide-narration">
          <p>${escapeHtml(step.text)}</p>
        </div>
        <button class="guide-continue-btn">계속 →</button>
      `;
      const btn = this.container.querySelector('.guide-continue-btn');
      btn.addEventListener('click', resolve);
      btn.focus();
    });
  }

  showGuide(step, stepIndex) {
    this.currentStep = stepIndex;
    return new Promise(resolve => {
      this.container.innerHTML = `
        <div class="guide-step-indicator">Step ${stepIndex + 1} / ${this.totalSteps}</div>
        <div class="guide-card">
          <div class="guide-card-icon" aria-hidden="true">💡</div>
          <h3 class="guide-card-title">${escapeHtml(step.title)}</h3>
          <p class="guide-card-body">${escapeHtml(step.body)}</p>
        </div>
        <button class="guide-continue-btn">계속 →</button>
      `;
      const btn = this.container.querySelector('.guide-continue-btn');
      btn.addEventListener('click', resolve);
      btn.focus();
    });
  }

  showCheckpoint(step, stepIndex) {
    this.currentStep = stepIndex;
    return new Promise(resolve => {
      this.container.innerHTML = `
        <div class="guide-step-indicator">Step ${stepIndex + 1} / ${this.totalSteps}</div>
        <div class="checkpoint">
          <h3 class="checkpoint-question">${escapeHtml(step.question)}</h3>
          <div class="checkpoint-options">
            ${step.options.map((opt, i) => `
              <button class="checkpoint-btn" data-index="${i}">${escapeHtml(opt)}</button>
            `).join('')}
          </div>
          <div class="checkpoint-feedback" aria-live="assertive"></div>
        </div>
      `;

      this.container.querySelectorAll('.checkpoint-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index);
          const feedback = this.container.querySelector('.checkpoint-feedback');

          if (idx === step.answer) {
            btn.classList.add('correct');
            if (feedback) {
              feedback.textContent = '정답입니다!';
              feedback.style.color = 'var(--success)';
            }
            this.container.querySelectorAll('.checkpoint-btn').forEach(b => { b.disabled = true; });
            setTimeout(resolve, 800);
          } else {
            btn.classList.add('wrong', 'shake');
            if (feedback) {
              feedback.textContent = '다시 시도해보세요.';
              feedback.style.color = 'var(--error)';
            }
            setTimeout(() => btn.classList.remove('shake'), 400);
          }
        });
      });
    });
  }

  clear() {
    this.container.innerHTML = '';
  }
}
