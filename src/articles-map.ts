import grayMatter from 'gray-matter';
import { Article } from './data';

// 导入所有 Markdown 文件
const articleFiles = import.meta.glob('./articles/*.md', { query: '?raw', eager: true }) as Record<string, { default: string }>;

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }

  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  return new Date().toISOString().split('T')[0];
}

// 解析 Front Matter 并生成文章列表
export const ARTICLES: Article[] = Object.entries(articleFiles)
  .map(([path, content]) => {
    const { data, content: body } = grayMatter(content.default);
    const normalizedDate = normalizeDate(data.date);

    // 从文件名提取 ID（去掉路径和扩展名）
    const fileName = path.replace('./articles/', '').replace('.md', '');

    return {
      id: fileName,
      title: data.title || '无标题',
      excerpt: data.excerpt || body.slice(0, 100).replace(/[#*`]/g, '').trim() + '...',
      date: normalizedDate,
      contentFile: path,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 按日期降序

// 根据 ID 获取文章内容
export function getArticleContent(id: string): string {
  const path = `./articles/${id}.md`;
  const file = articleFiles[path];
  if (!file) return '文章不存在';

  const { content } = grayMatter(file.default);
  return content;
}
