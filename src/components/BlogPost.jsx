import React from 'react'; // <-- **THIS LINE WAS MISSING**
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Frown } from 'lucide-react';
import { blogPosts } from '../data/blogData';

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center flex flex-col items-center justify-center bg-lepre-white text-lepre-text-primary min-h-screen">
        <Frown className="w-24 h-24 text-lepre-green mx-auto mb-6 animate-pulse" />
        <h1 className="text-5xl font-extrabold text-lepre-text-primary mb-4">404 - Page Not Found</h1>
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
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-lepre-green/20">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-lepre-green hover:text-lepre-gold font-bold transition-colors duration-300">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Posts
          </Link>
        </div>

        <span className="inline-block bg-lepre-green/20 text-lepre-green text-xs font-semibold px-3 py-1 rounded-full border border-lepre-green/30 mb-4">
          {post.category}
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-lepre-text-primary mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lepre-text-secondary text-sm mb-8 border-b border-lepre-green/20 pb-6">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-lepre-green" /><span>{post.date}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-lepre-green" /><span>{post.readTime}</span></div>
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-lepre-green" /><span>By {post.author}</span></div>
        </div>

        <img src={post.image} alt={post.title} className="w-full max-h-[350px] object-cover rounded-xl mb-8 shadow-lg hover:scale-105 transition-transform duration-300" />

        <div className="prose prose-lg max-w-none text-lepre-text-primary">
          {post.content.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index} className="text-lepre-text-secondary leading-relaxed mb-6">{block.text}</p>;
            }
            if (block.type === 'heading') {
              const HeadingTag = `h${block.level}`;
              // Using React.createElement requires the React library to be imported
              return React.createElement(HeadingTag, {
                key: index,
                className: "text-lepre-text-primary font-bold mb-4 mt-8"
              }, block.text);
            }
            return null;
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
    </div>
  );
}

export default BlogPost;