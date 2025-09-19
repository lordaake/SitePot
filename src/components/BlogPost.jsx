import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Frown, X } from 'lucide-react';
import { blogPosts } from '../data/blogData';

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  const [activeSource, setActiveSource] = useState(null);

  const renderFormattedText = (text) => {
    if (!text) return null;
    const regex = /(\[\d+\])|(\*\*.*?\*\*)/g;
    const parts = text.split(regex).filter(Boolean);

    return parts.map((part, index) => {
      const sourceMatch = part.match(/^\[(\d+)\]$/);
      if (sourceMatch) {
        const sourceId = parseInt(sourceMatch[1], 10);
        const source = post.sources?.find(s => s.id === sourceId);
        if (source) {
          return (
            <button
              key={index}
              className="inline-block align-baseline mx-1 px-1.5 py-0.5 bg-lepre-green/20 text-lepre-green font-bold text-xs rounded-md hover:bg-lepre-green/30 transition-all duration-200"
              onClick={(e) => { e.stopPropagation(); setActiveSource(source); }}
            >
              {sourceId}
            </button>
          );
        }
      }
      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) {
        return <strong key={index}>{boldMatch[1]}</strong>;
      }
      return part;
    });
  };

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center flex flex-col items-center justify-center bg-lepre-white text-lepre-text-primary min-h-screen">
        <Frown className="w-24 h-24 text-lepre-green mx-auto mb-6 animate-pulse" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-lepre-text-primary mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-lepre-text-secondary mb-8 max-w-md mx-auto">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-lepre-green to-lepre-gold text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-lepre-white min-h-screen">
      <Helmet>
        <title>{post.title} - SitePot Blog</title>
        <meta name="description" content={post.summary || `Read about ${post.title} on SitePot Blog.`} />
      </Helmet>
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-lepre-green/20">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-lepre-green hover:text-lepre-gold font-bold transition-colors duration-300">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Posts
          </Link>
        </div>

        <span className="inline-block bg-lepre-green/20 text-lepre-green text-xs font-semibold px-3 py-1 rounded-full border border-lepre-green/30 mb-4">
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-lepre-text-primary mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lepre-text-secondary text-sm mb-8 border-b border-lepre-green/20 pb-6">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-lepre-green" /><span>{post.date}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-lepre-green" /><span>{post.readTime}</span></div>
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-lepre-green" /><span>By {post.author}</span></div>
        </div>

        <img src={post.image} alt={post.title} className="w-full max-h-[300px] sm:max-h-[350px] object-cover rounded-xl mb-8 shadow-lg hover:scale-105 transition-transform duration-300" />

        <div className="prose prose-lg max-w-none text-lepre-text-primary">
          {post.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return <p key={index} className="text-lepre-text-secondary leading-relaxed mb-6">{renderFormattedText(block.text)}</p>;
              case 'heading':
                const HeadingTag = `h${block.level}`;
                return React.createElement(HeadingTag, { key: index, className: "text-lepre-text-primary font-bold mb-4 mt-8" }, renderFormattedText(block.text));
              case 'list':
                return (
                  <ul key={index} className="list-disc pl-6 space-y-3 mb-6">
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-lepre-text-secondary leading-relaxed">{renderFormattedText(item)}</li>
                    ))}
                  </ul>
                );
              case 'special':
                const styleClass = block.style === 'bold' ? 'font-bold' : 'italic';
                return <p key={index} className={`${styleClass} text-lepre-text-primary my-6`}>{renderFormattedText(block.text)}</p>;
              default:
                return null;
            }
          })}
        </div>

        <div className="flex items-center mt-10 pt-6 border-t border-lepre-green/20">
          <div className="w-12 h-12 bg-lepre-green/20 rounded-full flex items-center justify-center mr-4">
            <User className="w-6 h-6 text-lepre-green" />
          </div>
          <div>
            <p className="font-semibold text-lepre-text-primary">{post.author}</p>
            <p className="text-sm text-lepre-text-secondary">{post.authorTitle}</p>
          </div>
        </div>
      </article>

      {activeSource && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setActiveSource(null)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveSource(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors" aria-label="Close source">
              <X size={24} />
            </button>
            <h4 className="text-lg font-bold text-lepre-green mb-2">Source</h4>
            <p className="text-base text-lepre-text-secondary">{activeSource.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPost;