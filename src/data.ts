export interface Article {
  id: string;
  title: string;      // 文章标题
  excerpt: string;    // 文章摘要
  date: string;       // 文章日期
  contentFile: string; // Markdown 文件路径
}
