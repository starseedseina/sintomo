import { Message, Conversation } from "@/types/message";

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    participantIds: ["me", "u1"],
    lastMessage: {
      id: "msg1-5",
      conversationId: "conv1",
      senderId: "u1",
      content: "最近おすすめの自然スポットがあれば教えてください✨",
      sentAt: new Date(Date.now() - 600000).toISOString(),
      isRead: false,
    },
    updatedAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: "conv2",
    participantIds: ["me", "u3"],
    lastMessage: {
      id: "msg2-3",
      conversationId: "conv2",
      senderId: "me",
      content: "ヨガと食の話、もっと聞かせてほしいです",
      sentAt: new Date(Date.now() - 7200000).toISOString(),
      isRead: true,
    },
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "conv3",
    participantIds: ["me", "u2"],
    lastMessage: {
      id: "msg3-4",
      conversationId: "conv3",
      senderId: "u2",
      content: "心理学と精神性の関係について、またゆっくり話しましょう",
      sentAt: new Date(Date.now() - 86400000).toISOString(),
      isRead: true,
    },
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1-1",
      conversationId: "conv1",
      senderId: "u1",
      content: "はじめまして。プロフィールを拝見して気になりました。自然や内観が好きなところが共鳴しました。",
      sentAt: new Date(Date.now() - 3600000).toISOString(),
      isRead: true,
    },
    {
      id: "msg1-2",
      conversationId: "conv1",
      senderId: "me",
      content: "はじめまして、メッセージありがとうございます🌿 自然の中にいると、本当に心がリセットされますよね。",
      sentAt: new Date(Date.now() - 3300000).toISOString(),
      isRead: true,
    },
    {
      id: "msg1-3",
      conversationId: "conv1",
      senderId: "u1",
      content: "そうなんです！最近おすすめの自然スポットがあれば教えてください✨",
      sentAt: new Date(Date.now() - 600000).toISOString(),
      isRead: false,
    },
  ],
  conv2: [
    {
      id: "msg2-1",
      conversationId: "conv2",
      senderId: "u3",
      content: "ヨガを始めて3年になりますが、体と心のつながりをどんどん深く感じるようになっています。",
      sentAt: new Date(Date.now() - 10800000).toISOString(),
      isRead: true,
    },
    {
      id: "msg2-2",
      conversationId: "conv2",
      senderId: "u3",
      content: "食も同じで、何を食べるかより、どういう気持ちで食べるかが大事だと気づきました。",
      sentAt: new Date(Date.now() - 9000000).toISOString(),
      isRead: true,
    },
    {
      id: "msg2-3",
      conversationId: "conv2",
      senderId: "me",
      content: "ヨガと食の話、もっと聞かせてほしいです",
      sentAt: new Date(Date.now() - 7200000).toISOString(),
      isRead: true,
    },
  ],
  conv3: [
    {
      id: "msg3-1",
      conversationId: "conv3",
      senderId: "me",
      content: "心理学と人生哲学の関係について、Ryoさんはどう考えていますか？",
      sentAt: new Date(Date.now() - 172800000).toISOString(),
      isRead: true,
    },
    {
      id: "msg3-2",
      conversationId: "conv3",
      senderId: "u2",
      content: "とても深い問いですね。私は心理学は地図で、哲学は羅針盤だと思っています。",
      sentAt: new Date(Date.now() - 172000000).toISOString(),
      isRead: true,
    },
    {
      id: "msg3-3",
      conversationId: "conv3",
      senderId: "me",
      content: "その比喩、すごくしっくりきます。",
      sentAt: new Date(Date.now() - 100000000).toISOString(),
      isRead: true,
    },
    {
      id: "msg3-4",
      conversationId: "conv3",
      senderId: "u2",
      content: "心理学と精神性の関係について、またゆっくり話しましょう",
      sentAt: new Date(Date.now() - 86400000).toISOString(),
      isRead: true,
    },
  ],
};
