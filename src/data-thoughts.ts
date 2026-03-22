export interface Thought {
  id: string;
  content: string;
  date: string;
}

export const THOUGHTS: Thought[] = [
  {
    id: '1',
    content: '"不要因为追求速度而失去了对深刻的敬畏。在这个算法分发内容的时代，主动选择阅读什么是一种极大的自由。"',
    date: '星期三随笔',
  },
  {
    id: '2',
    content: '灵感：当代代码成为诗歌',
    date: '2024年3月11日',
  },
  {
    id: '3',
    content: '记录：重读海德格尔',
    date: '2024年3月8日',
  }
];
