const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(values) {
  const errors = {};

  if (!String(values.name ?? '').trim()) {
    errors.name = 'お名前を入力してください。';
  }

  if (!String(values.company ?? '').trim()) {
    errors.company = '会社名を入力してください。';
  }

  const email = String(values.email ?? '').trim();
  if (!email) {
    errors.email = 'メールアドレスを入力してください。';
  } else if (!emailPattern.test(email)) {
    errors.email = 'メールアドレスの形式を確認してください。';
  }

  if (!String(values.participants ?? '').trim()) {
    errors.participants = '参加予定人数を選択してください。';
  }

  if (!String(values.teamProfile ?? '').trim()) {
    errors.teamProfile = '参加者の職種・構成を入力してください。';
  }

  if (!String(values.challenge ?? '').trim()) {
    errors.challenge = '扱いたい社内課題を入力してください。';
  }

  if (!String(values.schedule ?? '').trim()) {
    errors.schedule = '希望時期を入力してください。';
  }

  if (values.agreement !== 'agreed') {
    errors.agreement = '個人情報の取り扱いへの同意が必要です。';
  }

  return {
    errors,
    ok: Object.keys(errors).length === 0,
  };
}
