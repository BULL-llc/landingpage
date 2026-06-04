import { applicationQuestions } from './content.js';
import { validateApplication } from './validation.js';

const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');

function closeMenu() {
  nav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

for (const link of document.querySelectorAll('[data-scroll-target]')) {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    const target = href ? document.querySelector(href) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

for (const button of document.querySelectorAll('[data-faq-button]')) {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item?.querySelector('.faq-answer');
    const shouldOpen = button.getAttribute('aria-expanded') !== 'true';

    button.setAttribute('aria-expanded', String(shouldOpen));

    if (answer) {
      answer.hidden = !shouldOpen;
    }
  });
}

const flow = document.querySelector('[data-application-flow]');
const flowQuestion = document.querySelector('[data-flow-question]');
const flowProgress = document.querySelector('[data-flow-progress]');
const flowSteps = document.querySelector('[data-flow-steps]');
const formStatus = document.querySelector('[data-form-status]');

const applicationState = {
  answers: {
    agreement: '',
    challenge: '',
    company: '',
    email: '',
    name: '',
    participants: '',
    schedule: '',
    teamProfile: '',
  },
  step: 0,
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getParticipantLabel(value) {
  const question = applicationQuestions.find(
    (applicationQuestion) => applicationQuestion.key === 'participants'
  );

  return (
    question?.options.find((option) => option.value === value)?.label ??
    String(value)
  );
}

function getAnswerLabel(key, value) {
  if (key === 'participants') {
    return getParticipantLabel(value);
  }

  return value;
}

function updateFlowSteps() {
  for (const step of flowSteps?.querySelectorAll('[data-step-index]') ?? []) {
    const index = Number(step.getAttribute('data-step-index'));
    step.classList.toggle('is-complete', index < applicationState.step);
    step.classList.toggle('is-active', index === applicationState.step);
    step.setAttribute(
      'aria-current',
      index === applicationState.step ? 'step' : 'false'
    );
  }
}

function setStatus(message, type = '') {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.classList.toggle('is-error', type === 'error');
  formStatus.classList.toggle('is-success', type === 'success');
}

function renderChoiceQuestion(question) {
  return `
    <div class="flow-choice-list" role="radiogroup" aria-label="${escapeHtml(question.label)}">
      ${question.options
        .map(
          (option) => `
            <button
              class="choice-button ${applicationState.answers[question.key] === option.value ? 'is-selected' : ''}"
              type="button"
              data-choice-value="${escapeHtml(option.value)}"
            >
              ${escapeHtml(option.label)}
            </button>
          `
        )
        .join('')}
    </div>
  `;
}

function renderField(question) {
  const value = escapeHtml(applicationState.answers[question.key] ?? '');

  if (question.type === 'choice') {
    return renderChoiceQuestion(question);
  }

  if (question.type === 'textarea') {
    return `
      <textarea
        id="flow-answer"
        name="${escapeHtml(question.key)}"
        rows="5"
        aria-describedby="flow-hint flow-error"
        placeholder="${escapeHtml(question.placeholder)}"
      >${value}</textarea>
    `;
  }

  return `
    <input
      id="flow-answer"
      name="${escapeHtml(question.key)}"
      autocomplete="${escapeHtml(question.autocomplete ?? 'off')}"
      inputmode="${escapeHtml(question.inputMode ?? 'text')}"
      aria-describedby="flow-hint flow-error"
      placeholder="${escapeHtml(question.placeholder)}"
      value="${value}"
    />
  `;
}

function renderQuestion() {
  const question = applicationQuestions[applicationState.step];

  if (!flowQuestion || !question) {
    return;
  }

  if (flowProgress) {
    flowProgress.textContent = `${applicationState.step + 1} / ${
      applicationQuestions.length + 1
    }`;
  }

  updateFlowSteps();
  setStatus('');

  flowQuestion.innerHTML = `
    <form class="flow-card" data-flow-form>
      <p class="flow-prompt">${escapeHtml(question.prompt)}</p>
      ${
        question.type === 'choice'
          ? `<p class="flow-label">${escapeHtml(question.label)}</p>`
          : `<label for="flow-answer">${escapeHtml(question.label)}</label>`
      }
      ${renderField(question)}
      <p class="flow-hint" id="flow-hint">${escapeHtml(question.hint)}</p>
      <p class="flow-error" id="flow-error" role="alert" aria-live="polite"></p>
      <div class="flow-actions">
        ${
          applicationState.step > 0
            ? '<button class="button flow-secondary" type="button" data-flow-back>ひとつ前にもどる</button>'
            : ''
        }
        <button class="button button-primary" type="submit">次へ進む</button>
      </div>
    </form>
  `;

  const form = flowQuestion.querySelector('[data-flow-form]');
  const field = flowQuestion.querySelector('#flow-answer');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    submitQuestion(question);
  });

  flowQuestion
    .querySelector('[data-flow-back]')
    ?.addEventListener('click', () => {
      applicationState.step -= 1;
      renderQuestion();
    });

  for (const button of flowQuestion.querySelectorAll('[data-choice-value]')) {
    button.addEventListener('click', () => {
      applicationState.answers[question.key] =
        button.getAttribute('data-choice-value') ?? '';
      renderQuestion();
    });
  }

  if (field instanceof HTMLElement) {
    field.focus();
  }
}

function submitQuestion(question) {
  if (question.type === 'choice') {
    if (!applicationState.answers[question.key]) {
      setStatus('参加予定人数を選択してください。', 'error');
      return;
    }
  } else {
    const field = flowQuestion?.querySelector('#flow-answer');
    const value =
      field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement
        ? field.value.trim()
        : '';

    if (!value) {
      setStatus('ここを入力してから次へ進んでください。', 'error');
      field?.focus();
      return;
    }

    applicationState.answers[question.key] = value;
  }

  applicationState.step += 1;

  if (applicationState.step >= applicationQuestions.length) {
    renderConfirmation();
    return;
  }

  renderQuestion();
}

function renderConfirmation() {
  if (!flowQuestion) {
    return;
  }

  if (flowProgress) {
    flowProgress.textContent = `${applicationQuestions.length + 1} / ${
      applicationQuestions.length + 1
    }`;
  }

  updateFlowSteps();
  setStatus('');

  const rows = applicationQuestions
    .map(
      (question) => `
        <div>
          <dt>${escapeHtml(question.label)}</dt>
          <dd>${escapeHtml(getAnswerLabel(question.key, applicationState.answers[question.key]))}</dd>
        </div>
      `
    )
    .join('');

  flowQuestion.innerHTML = `
    <form class="flow-card flow-confirmation" data-confirm-form>
      <p class="flow-prompt">入力内容を確認してください。</p>
      <dl class="answer-summary">${rows}</dl>
      <label class="flow-consent">
        <input type="checkbox" name="agreement" value="agreed" />
        個人情報の取り扱いに同意し、送信します。
      </label>
      <div class="flow-actions">
        <button class="button flow-secondary" type="button" data-flow-back>ひとつ前にもどる</button>
        <button class="button button-primary" type="submit">参加申し込みを送信する</button>
      </div>
    </form>
  `;

  flowQuestion
    .querySelector('[data-flow-back]')
    ?.addEventListener('click', () => {
      applicationState.step = applicationQuestions.length - 1;
      renderQuestion();
    });

  flowQuestion
    .querySelector('[data-confirm-form]')
    ?.addEventListener('submit', (event) => {
      event.preventDefault();
      const agreement = flowQuestion.querySelector('[name="agreement"]');

      applicationState.answers.agreement =
        agreement instanceof HTMLInputElement && agreement.checked
          ? 'agreed'
          : '';

      const result = validateApplication(applicationState.answers);

      if (!result.ok) {
        setStatus(Object.values(result.errors)[0], 'error');
        return;
      }

      setStatus(
        '送信内容を受け付けました。担当者より2営業日以内にご連絡します。',
        'success'
      );
      flowQuestion.innerHTML = `
      <div class="flow-card flow-complete">
        <p class="flow-prompt">参加申し込みを受け付けました。</p>
        <p>
          ありがとうございます。いただいた前提情報をもとに、開催時期・人数・社内課題に合わせた進め方を確認します。
        </p>
        <button class="button flow-secondary" type="button" data-flow-restart>もう一度入力する</button>
      </div>
    `;

      flowQuestion
        .querySelector('[data-flow-restart]')
        ?.addEventListener('click', () => {
          applicationState.step = 0;
          applicationState.answers = {
            agreement: '',
            challenge: '',
            company: '',
            email: '',
            name: '',
            participants: '',
            schedule: '',
            teamProfile: '',
          };
          renderQuestion();
        });
    });
}

if (flow) {
  renderQuestion();
}
