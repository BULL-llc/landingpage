export const program = {
  name: '生成AIプロダクト開発ブートキャンプ',
  headline: '2日間で、アイデアを動くプロダクトへ',
  priceLabel: '2日間 / 1名 200,000円（税別）',
  maxParticipants: 6,
};

export const curriculumModules = [
  '生成AIの基礎と活用法',
  'AI×テキスト化とGit運用',
  'クラウド活用',
  'プロトタイピング演習',
];

export const faqItems = [
  '対象となる人材は？',
  '事前の知識やスキルは必要ですか？',
  '何名まで参加できますか？',
  '社内課題に合わせて内容を変えられますか？',
];

export const applicationQuestions = [
  {
    autocomplete: 'name',
    hint: '担当者として連絡が取れる方のお名前を入力してください。',
    inputMode: 'text',
    key: 'name',
    label: '担当者のお名前',
    placeholder: '例）山田 太郎',
    prompt: 'まず、今回の参加申し込みを進める担当者のお名前を教えてください。',
    type: 'input',
  },
  {
    autocomplete: 'organization',
    hint: '正式名称でなくても、こちらから識別できれば大丈夫です。',
    inputMode: 'text',
    key: 'company',
    label: '会社名・組織名',
    placeholder: '例）株式会社〇〇',
    prompt: 'ありがとうございます。次に、会社名または組織名を教えてください。',
    type: 'input',
  },
  {
    autocomplete: 'email',
    hint: '日程調整や事前準備のご連絡に使います。',
    inputMode: 'email',
    key: 'email',
    label: 'メールアドレス',
    placeholder: '例）taro.yamada@example.co.jp',
    prompt: 'ご連絡先のメールアドレスを教えてください。',
    type: 'input',
  },
  {
    hint: '通常枠は6名までです。7名以上は運営体制を調整するため応相談にします。',
    key: 'participants',
    label: '参加予定人数',
    options: [
      { label: '1名', value: '1' },
      { label: '2名', value: '2' },
      { label: '3名', value: '3' },
      { label: '4名', value: '4' },
      { label: '5名', value: '5' },
      { label: '6名', value: '6' },
      { label: '7名以上（応相談）', value: 'consult' },
    ],
    prompt: '参加予定人数は何名ですか？',
    type: 'choice',
  },
  {
    hint: '例: エンジニア3名、企画2名、DX推進1名など。',
    key: 'teamProfile',
    label: '参加者の職種・構成',
    placeholder: '例）エンジニア3名、事業企画2名、DX推進1名',
    prompt: '参加者はどんな職種・役割の方を想定していますか？',
    type: 'textarea',
  },
  {
    hint: '研修中のプロトタイピングテーマに近いほど、内容を合わせやすくなります。',
    key: 'challenge',
    label: '扱いたい社内課題',
    placeholder:
      '例）営業提案の下準備を効率化したい / 顧客向けの新サービスを試作したい',
    prompt: 'この2日間で扱いたい社内課題やテーマを教えてください。',
    type: 'textarea',
  },
  {
    hint: '未定の場合は「未定」と入力してください。',
    inputMode: 'text',
    key: 'schedule',
    label: '希望時期',
    placeholder: '例）2026年7月下旬 / 未定',
    prompt: '最後に、開催の希望時期を教えてください。',
    type: 'input',
  },
];
