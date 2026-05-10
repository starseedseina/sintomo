export interface Question {
  id: string;
  text: string;
  placeholder: string;
}

export const DEEP_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "あなたにとって「幸せ」とはどんな状態ですか？",
    placeholder: "心が静かで、自分らしくいられる瞬間…など自由に書いてください",
  },
  {
    id: "q2",
    text: "どんな時に「自分らしさ」を感じますか？",
    placeholder: "自然の中にいるとき、創作しているとき…など",
  },
  {
    id: "q3",
    text: "あなたが人と繋がる時に最も大切にしていることは何ですか？",
    placeholder: "正直さ、共鳴する感覚、深い対話…など",
  },
  {
    id: "q4",
    text: "今、あなたの人生で最も育てたいと思っているものは何ですか？",
    placeholder: "内面の静けさ、創造力、人との深い関係…など",
  },
  {
    id: "q5",
    text: "あなたの人生に最も影響を与えた体験や気づきを教えてください。",
    placeholder: "旅、本、出会い、困難…など",
  },
  {
    id: "q6",
    text: "目に見えない世界（直感、波動、魂など）についてどう感じていますか？",
    placeholder: "日常的に感じている、半信半疑、大切にしている…など",
  },
  {
    id: "q7",
    text: "理想の一日を自由に描くとしたら、どんな一日ですか？",
    placeholder: "朝の過ごし方から夜まで、ありのままに",
  },
  {
    id: "q8",
    text: "どんな思想や価値観を持つ人と繋がりたいですか？",
    placeholder: "精神的に自立している、自然体で深い…など",
  },
  {
    id: "q9",
    text: "あなたが恐れていることと、それとどう向き合っていますか？",
    placeholder: "孤独、変化への不安…そしてその向き合い方",
  },
  {
    id: "q10",
    text: "5年後、どんな自分でありたいですか？",
    placeholder: "内面でも外見でも、ありたい姿を",
  },
];

export const ONBOARDING_QUESTIONS = DEEP_QUESTIONS.slice(0, 3);
