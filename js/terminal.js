const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function sleep(ms) {
  if (prefersReducedMotion || ms <= 0) return Promise.resolve();
  return new Promise(r => setTimeout(r, ms));
}

export class Terminal {
  constructor(container) {
    this.container = container;
    this.destroyed = false;

    this.container.innerHTML = `
      <div class="terminal" role="log" aria-label="터미널 시뮬레이터">
        <div class="terminal-chrome">
          <div class="terminal-dot red"></div>
          <div class="terminal-dot yellow"></div>
          <div class="terminal-dot green"></div>
        </div>
        <div class="terminal-body" id="terminal-body"></div>
      </div>
    `;

    this.body = this.container.querySelector('.terminal-body');
  }

  async runStep(step) {
    if (this.destroyed) return;

    switch (step.type) {
      case 'prompt':
        await this.runPrompt(step);
        break;
      case 'output':
        await this.runOutput(step);
        break;
    }
  }

  async runPrompt(step) {
    if (this.destroyed) return;

    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-prompt';
    promptLine.innerHTML = `
      <span class="prompt-cwd">${step.cwd || '~'} $</span>
      <span class="prompt-input"></span>
      <span class="typing-cursor"></span>
    `;
    this.body.appendChild(promptLine);

    const choiceGroup = document.createElement('div');
    choiceGroup.className = 'choice-group';

    step.choices.forEach((choice, i) => {
      const btn = document.createElement('button');
      btn.className = i === 0 ? 'choice-btn' : 'choice-btn secondary';
      btn.textContent = choice.label;
      btn.setAttribute('aria-label', choice.label);
      choiceGroup.appendChild(btn);
    });

    this.body.appendChild(choiceGroup);
    this.scrollToBottom();

    return new Promise(resolve => {
      const hintEl = document.createElement('div');
      hintEl.className = 'choice-hint';
      let hintAdded = false;

      choiceGroup.querySelectorAll('.choice-btn').forEach((btn, i) => {
        btn.addEventListener('click', async () => {
          if (this.destroyed) { resolve(); return; }

          const choice = step.choices[i];

          if (!choice.correct) {
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 400);

            if (choice.hint) {
              hintEl.textContent = choice.hint;
              if (!hintAdded) {
                choiceGroup.after(hintEl);
                hintAdded = true;
              }
              this.scrollToBottom();
            }
            return;
          }

          // Correct choice
          choiceGroup.remove();
          if (hintAdded) hintEl.remove();

          const inputSpan = promptLine.querySelector('.prompt-input');
          const cursor = promptLine.querySelector('.typing-cursor');

          await this.typeText(inputSpan, choice.label);

          if (cursor) cursor.remove();

          await sleep(200);
          resolve();
        });
      });
    });
  }

  async runOutput(step) {
    if (this.destroyed) return;

    for (const line of step.lines) {
      if (this.destroyed) return;

      const el = document.createElement('div');
      el.className = `terminal-line ${line.style || ''}`.trim();

      if (line.text === '') {
        el.innerHTML = '&nbsp;';
      } else {
        el.textContent = line.text;
      }

      this.body.appendChild(el);
      this.scrollToBottom();
      await sleep(line.delay || 300);
    }
  }

  async typeText(element, text, charDelay = 40) {
    if (prefersReducedMotion) {
      element.textContent = text;
      return;
    }

    for (let i = 0; i < text.length; i++) {
      if (this.destroyed) { element.textContent = text; return; }
      element.textContent += text[i];
      this.scrollToBottom();
      await sleep(charDelay);
    }
  }

  scrollToBottom() {
    if (this.body) {
      this.body.scrollTop = this.body.scrollHeight;
    }
  }

  clear() {
    if (this.body) this.body.innerHTML = '';
  }

  destroy() {
    this.destroyed = true;
  }
}
