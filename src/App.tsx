import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ArrowRight, Lightbulb, BookOpen, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ARTICLES, THOUGHTS, Article } from './data';
import { articleContents } from './articles-map';
import { cn } from './lib/utils';

// 文章详情组件
function ArticleView({ article, onBack }: { article: Article; onBack: () => void }) {
  const content = articleContents[article.id] || '文章内容加载失败';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto"
    >
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-brand-muted hover:text-brand-ink transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium uppercase tracking-widest">返回文章列表</span>
      </button>

      {/* 文章头部 */}
      <header className="mb-12 space-y-6">
        <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-highlight">
          <span>{article.category}</span>
          <span className="w-1 h-1 bg-brand-highlight rounded-full"></span>
          <span className="text-brand-muted">{article.date}</span>
          <span className="w-1 h-1 bg-brand-highlight rounded-full"></span>
          <span className="text-brand-muted">{article.readTime}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif leading-tight font-medium">
          {article.title}
        </h1>

        <p className="text-lg text-brand-muted leading-relaxed">
          {article.excerpt}
        </p>
      </header>

      {/* 文章内容 */}
      <article className="prose prose-lg prose-serif max-w-none
        prose-headings:font-serif prose-headings:font-medium prose-headings:text-brand-ink
        prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-12
        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:border-b prose-h2:border-brand-ink/10 prose-h2:pb-3
        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8
        prose-p:text-brand-ink/80 prose-p:leading-relaxed
        prose-blockquote:border-l-brand-highlight prose-blockquote:bg-brand-highlight/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r prose-blockquote:not-italic
        prose-strong:text-brand-ink prose-strong:font-semibold
        prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline
        prose-ul:my-6 prose-ol:my-6
        prose-li:text-brand-ink/80
        prose-code:bg-brand-ink/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-hr:border-brand-ink/10 prose-hr:my-12
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>

      {/* 文章底部 */}
      <footer className="mt-16 pt-8 border-t border-brand-ink/10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-brand-accent hover:text-brand-accent/80 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">返回文章列表</span>
          </button>

          <div className="text-xs text-brand-muted uppercase tracking-widest">
            The Digital Atelier
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-highlight/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-ink/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1
            className="text-2xl font-serif font-bold tracking-tight italic cursor-pointer hover:text-brand-accent transition-colors"
            onClick={() => setSelectedArticle(null)}
          >
            The Digital Atelier
          </h1>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest text-brand-muted">
            <a href="#" className="text-brand-ink border-b border-brand-highlight pb-1">Archive</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Library</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Articles</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Curator</a>
          </nav>

          <button className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors">
            <User size={20} />
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            // 文章详情视图
            <ArticleView
              key="article-view"
              article={selectedArticle}
              onBack={handleBackToList}
            />
          ) : (
            // 文章列表视图
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {/* Hero Section */}
              <section className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 text-xs font-medium uppercase tracking-[0.2em] text-brand-highlight">
                    <span className="w-8 h-[1px] bg-brand-highlight"></span>
                    <span>数字工坊 / THE CURATOR</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-serif leading-tight font-medium">
                    在技术喧嚣中寻找人文的锚点
                  </h2>

                  <p className="text-lg text-brand-muted leading-relaxed max-w-2xl">
                    这里是数字工坊。我们通过历史的滤镜观察人工智能，在代码的逻辑中探寻哲学的脉络。这里不生产快餐式的信息，只提供经过时间沉淀的深度思考。
                  </p>

                  <div className="flex items-center space-x-8 pt-2">
                    <button className="bg-brand-accent text-white px-6 py-2.5 rounded-sm font-medium hover:bg-brand-accent/90 transition-all text-sm">
                      阅读卷首语
                    </button>
                    <button className="flex items-center space-x-2 text-brand-ink font-medium group text-sm">
                      <span>了解策展人</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </section>

              {/* Content Grid */}
              <section className="grid lg:grid-cols-12 gap-12">

                {/* Main Articles Column */}
                <div className="lg:col-span-8 space-y-12">
                  <div className="flex items-center justify-between border-b border-brand-ink/10 pb-4">
                    <h3 className="text-lg font-bold tracking-tight uppercase">近期阅读 / READS</h3>
                    <a href="#" className="text-xs font-medium text-brand-muted hover:text-brand-ink uppercase tracking-widest">查看全部</a>
                  </div>

                  <div className="space-y-10">
                    {/* All Articles Unified */}
                    {ARTICLES.map((article) => (
                      <motion.article
                        key={article.id}
                        whileHover={{ x: 4 }}
                        onClick={() => handleArticleClick(article)}
                        className="group cursor-pointer border-b border-brand-ink/5 pb-8 last:border-0"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-highlight">
                            <span>{article.category}</span>
                            <span className="w-1 h-1 bg-brand-highlight rounded-full"></span>
                            <span className="text-brand-muted">{article.date}</span>
                          </div>
                          <h4 className="text-2xl font-serif font-medium group-hover:text-brand-highlight transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-sm text-brand-muted leading-relaxed max-w-2xl">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-[10px] text-brand-muted uppercase tracking-widest pt-1">
                              {article.readTime}
                            </div>
                            <div className="flex items-center space-x-1 text-brand-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>阅读全文</span>
                              <ArrowRight size={14} />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 space-y-12">

                  {/* Thoughts Section */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-brand-ink/10 pb-4">
                      <h3 className="text-xl font-bold tracking-tight uppercase">随笔 / THOUGHTS</h3>
                      <a href="#" className="text-xs font-medium text-brand-muted hover:text-brand-ink uppercase tracking-widest">关注流</a>
                    </div>

                    <div className="space-y-6">
                      {/* Main Thought Card */}
                      <div className="bg-[#fdfdfb] p-8 rounded-sm border border-brand-ink/5 shadow-sm space-y-6">
                        <p className="text-lg font-serif italic leading-relaxed text-brand-ink/80">
                          {THOUGHTS[0].content}
                        </p>
                        <p className="text-[10px] text-brand-muted uppercase tracking-widest">— {THOUGHTS[0].date}</p>
                      </div>

                      {/* Small Thought Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-brand-accent p-6 rounded-sm text-white space-y-4 group cursor-pointer">
                          <Lightbulb size={20} className="text-brand-highlight" />
                          <p className="text-sm font-serif">{THOUGHTS[1].content}</p>
                        </div>
                        <div className="bg-gray-200 p-6 rounded-sm space-y-4 group cursor-pointer">
                          <BookOpen size={20} className="text-brand-accent" />
                          <p className="text-sm font-serif">{THOUGHTS[2].content}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter Placeholder */}
                  <div className="bg-brand-highlight/10 p-8 rounded-sm space-y-4">
                    <h4 className="font-serif text-xl italic">订阅我们的通讯</h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      每周一次，将深度的技术观察与人文思考直接送达您的收件箱。
                    </p>
                    <div className="flex">
                      <input
                        type="email"
                        placeholder="您的电子邮箱"
                        className="flex-grow bg-white border-none text-xs p-3 focus:ring-1 focus:ring-brand-highlight outline-none"
                      />
                      <button className="bg-brand-ink text-white px-4 text-xs font-bold uppercase tracking-widest">
                        加入
                      </button>
                    </div>
                  </div>

                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-bg border-t border-brand-ink/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-serif italic">The Digital Atelier</h2>
            <p className="text-[10px] text-brand-muted uppercase tracking-widest">
              © 2024 THE DIGITAL ATELIER. CURATING THE INTERSECTION OF HUMANITY & TECH.
            </p>
          </div>

          <div className="flex items-center space-x-8 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
            <a href="#" className="hover:text-brand-ink transition-colors">Colophon</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Newsletter</a>
            <a href="#" className="hover:text-brand-ink transition-colors">RSS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
