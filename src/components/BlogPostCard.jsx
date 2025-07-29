// src/components/BlogPostCard.jsx
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

export default function BlogPostCard({ post }) {
    return (
        // The main card container with hover effects
        <article className="group flex flex-col bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* Blog post image */}
            <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            {/* Card content */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Post Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-montserrat mb-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                    </Link>
                </h3>

                {/* Post Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 flex-grow mb-4">
                    {post.excerpt}
                </p>

                {/* Post Metadata (Author and Date) */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mr-4">
                        <User className="h-4 w-4 mr-2" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <time dateTime={post.date}>{post.date}</time>
                    </div>
                </div>
            </div>
        </article>
    );
}
