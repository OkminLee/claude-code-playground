export class GuidePanel {
  constructor(container) {
    this.container = container;
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
          <p>${step.text}</p>
        </div>
        <button class="guide-continue-btn">계속 →</button>
      `;
      this.container.querySelector('.guide-continue-btn').addEventListener('click', resolve);
    });
  }

  showGuide(step, stepIndex) {
    this.currentStep = stepIndex;
    return new Promise(resolve => {
      this.container.innerHTML = `
        <div class="guide-step-indicator">Step ${stepIndex + 1} / ${this.totalSteps}</div>
        <div class="guide-card">
          <div class="guide-card-icon">💡</div>
          <h3 class="guide-card-title">${step.title}</h3>
          <p class="guide-card-body">${step.body}</p>
        </div>
        <button class="guide-continue-btn">계속 →</button>
      `;
      this.container.querySelector('.guide-continue-btn').addEventListener('click', resolve);
    });
  }

  showCheckpoint(step, stepIndex) {
    this.currentStep = stepIndex;
    return new Promise(resolve => {
      this.container.innerHTML = `
        <div class="guide-step-indicator">Step ${stepIndex + 1} / ${this.totalSteps}</div>
        <div class="checkpoint">
          <h3 class="checkpoint-question">✏️ ${step.question}</h3>
          <div class="checkpoint-options">
            ${step.options.map((opt, i) => `
              <button class="checkpoint-btn" data-index="${i}">${opt}</button>
            `).join('')}
          </div>
          <div class="checkpoint-feedback" id="checkpoint-feedback"></div>
        </div>
      `;

      this.container.querySelectorAll('.checkpoint-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index);
          const feedback = this.container.querySelector('#checkpoint-feedback');

          if (idx === step.answer) {
            btn.classList.add('correct');
            if (feedback) {
              feedback.textContent = '정답입니다! 👏';
              feedback.style.color = 'var(--success)';
            }
            // Disable all buttons
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
