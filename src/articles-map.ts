// 使用 Vite 的 ?raw 导入 Markdown 文件内容
import augustineDigitalCity from './articles/augustine-digital-city.md?raw';
import technologyAlienation from './articles/technology-alienation.md?raw';
import siliconValleyPhilosophers from './articles/silicon-valley-philosophers.md?raw';
import aiAnxiety from './articles/ai-anxiety.md?raw';

export const articleContents: Record<string, string> = {
  '1': augustineDigitalCity,
  '2': technologyAlienation,
  '3': siliconValleyPhilosophers,
  '4': aiAnxiety,
};
