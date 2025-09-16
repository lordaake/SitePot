// src/components/BlogPost.jsx

import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Frown } from 'lucide-react';
import { blogPosts } from '../data/blogData'; // Correct import path

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
        <Frown className="w-24 h-24 text-neon-pink mx-auto mb-6 animate-pulse" />
        <h1 className="text-5xl font-extrabold text-yellow-300 mb-4">404 - Spell Not Found</h1>
        <p className="text-lg text-neon-green/80 mb-8 max-w-md mx-auto">
          The ancient scroll you seek has vanished into the ether.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-400 via-neon-orange to-yellow-500 text-purple-900 font-extrabold rounded-xl shadow-lg hover:shadow-yellow-500/70 hover:scale-105 transform transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Return to the Library
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto bg-black/30 rounded-2xl shadow-lg shadow-purple-900/30 p-6 sm:p-10 border border-neon-pink/20">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-neon-orange hover:text-yellow-200 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Spells
          </Link>
        </div>

        <span className="inline-block bg-neon-pink/25 text-neon-pink text-xs font-semibold px-3 py-1 rounded-full border border-neon-pink/60 mb-4">
          {post.category}
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-300 mb-6 leading-tight drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-neon-green/80 text-sm mb-8 border-b border-neon-pink/20 pb-6">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-neon-pink" /><span>{post.date}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-neon-pink" /><span>{post.readTime}</span></div>
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-neon-pink" /><span>By {post.author}</span></div>
        </div>

        <img src={post.image} alt={post.title} className="w-full max-h-[450px] object-cover rounded-xl mb-8 shadow-lg" />

        <div className="prose prose-lg max-w-none 
                        prose-p:text-neon-green/90 
                        prose-headings:text-yellow-300 
                        prose-strong:text-white 
                        prose-a:text-neon-pink prose-a:underline hover:prose-a:text-white
                        prose-blockquote:text-neon-orange/90 prose-blockquote:border-neon-orange/50">
          {post.content.map((block, index) => {
            if (block.type === 'paragraph') return <p key={index}>{block.text}</p>;
            if (block.type === 'heading') {
              const HeadingTag = `h${block.level}`;
              return <HeadingTag key={index}>{block.text}</HeadingTag>;
            }
            return null;
          })}
        </div>

        <div className="flex items-center mt-10 pt-6 border-t border-neon-pink/20">
          <User className="w-12 h-12 text-neon-green/50 mr-4" />
          <div>
            <p className="font-semibold text-neon-green">{post.author}</p>
            <p className="text-sm text-neon-green/70">{post.authorTitle}</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;