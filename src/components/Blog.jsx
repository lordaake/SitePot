import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

function Blog() {
  return (
    <div className="container mx-auto px-4 py-12 bg-lepre-white min-h-screen text-lepre-text-primary">
      <section className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-lepre-green mb-4">
          Domain Insights
        </h2>
        <p className="text-xl text-lepre-text-secondary max-w-3xl mx-auto leading-relaxed">
          Expert strategies, trends, and tutorials for choosing, investing in, and maximizing the value of premium domains.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-lepre-green/20 flex flex-col hover:-translate-y-2 transform group"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6 flex flex-col flex-grow">
              <span className="bg-lepre-green/20 text-lepre-green text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start tracking-wide">
                {post.category}
              </span>
              <h3 className="text-2xl font-bold text-lepre-text-primary mb-3 flex-grow leading-tight group-hover:text-lepre-green transition-colors duration-300">
                {post.title}
              </h3>
              <div className="flex items-center text-lepre-text-tertiary text-sm mt-auto mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-lepre-green" /> {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-lepre-green" /> {post.readTime}
                </div>
              </div>
              <p className="text-lepre-text-secondary text-base mb-6 h-20 overflow-hidden leading-relaxed">
                {post.content[0].text.substring(0, 120)}...
              </p>
              <Link
                to={`/blog/${post.id}`}
                className="mt-auto inline-flex items-center text-lepre-green hover:text-lepre-gold font-bold self-start text-lg group-hover:translate-x-1 transition-all duration-300"
              >
                Read More <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Blog;