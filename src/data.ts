export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  contentFile: string; // Markdown 文件路径
}

export interface Thought {
  id: string;
  content: string;
  date: string;
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: '《奥古斯丁的数字之城》：探讨算法时代的道德边界',
    excerpt: '在代码的逻辑中探寻哲学的脉络。这里不生产快餐式的信息，只提供经过时间沉淀的深度思考。',
    category: '历史与AI',
    date: '2024年3月12日',
    readTime: '12分钟阅读',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    contentFile: './articles/augustine-digital-city.md',
  },
  {
    id: '2',
    title: '技术异化与人的本质',
    excerpt: '当技术不再是工具，而是环境本身，我们该如何定义自我？',
    category: '技术哲学',
    date: '2024年3月10日',
    readTime: '8分钟阅读',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    contentFile: './articles/technology-alienation.md',
  },
  {
    id: '3',
    title: '硅谷的哲学家：访谈录',
    excerpt: '对话那些在代码海洋中寻找意义的先行者。',
    category: '人物访谈',
    date: '2024年3月5日',
    readTime: '15分钟阅读',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    contentFile: './articles/silicon-valley-philosophers.md',
  },
  {
    id: '4',
    title: '为什么我们对AI感到焦虑？',
    excerpt: '焦虑的根源不在于机器的强大，而在于人类主体性的迷失。',
    category: '社会心理',
    date: '2024年3月1日',
    readTime: '10分钟阅读',
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
    contentFile: './articles/ai-anxiety.md',
  }
];

export const THOUGHTS: Thought[] = [
  {
    id: '1',
    content: '“不要因为追求速度而失去了对深刻的敬畏。在这个算法分发内容的时代，主动选择阅读什么是一种极大的自由。”',
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
