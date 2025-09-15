
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Choosing the Perfect Domain Name for Your Business',
    category: 'Domain Strategy',
    date: 'January 15, 2024',
    readTime: '5 min read',
    author: 'Ram Larsson',
    authorTitle: 'Domain Expert',
    image: 'https://via.placeholder.com/400x250/AEC6CF/FFFFFF?text=Domain+Strategy',
    content: [
      {
        type: 'paragraph',
        text: 'Choosing the right domain name is one of the most critical decisions you\'ll make for your business. A great domain name serves as your digital identity, influences your brand perception, and can significantly impact your online success.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'What Makes a Great Domain Name?'
      },
      {
        type: 'paragraph',
        text: 'A premium domain name should be short, memorable, and easy to spell. The best domains are typically between 6-14 characters long and avoid hyphens, numbers, or complex spellings that could confuse potential visitors.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'The Power of .com Extensions'
      },
      {
        type: 'paragraph',
        text: 'While there are hundreds of domain extensions available today, .com remains the gold standard. Studies show that .com domains are trusted more by consumers and are easier to remember. When someone hears your business name, they\'ll instinctively type \".com\" at the end.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Brandability vs. Keywords'
      },
      {
        type: 'paragraph',
        text: 'Modern SEO practices favor brandable domains over exact-match keyword domains. A unique, brandable name like \"Google\" or \"Amazon\" becomes synonymous with your business and is easier to trademark and protect.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Investment Potential'
      },
      {
        type: 'paragraph',
        text: 'Premium domains are digital real estate. Just as location matters in physical real estate, a great domain name can appreciate in value over time. Many businesses have paid millions for the perfect domain because they understand its long-term value.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Making the Right Choice'
      },
      {
        type: 'paragraph',
        text: 'When evaluating domains, consider how they sound when spoken aloud, how they look in marketing materials, and whether they can grow with your business. The perfect domain should work for your current needs while leaving room for future expansion.'
      }
    ]
  },
  {
    id: 2,
    title: 'Why Premium .com Domains Are Worth the Investment',
    category: 'Investment',
    date: 'January 10, 2024',
    readTime: '4 min read',
    author: 'Ram Larsson',
    authorTitle: 'Domain Expert',
    image: 'https://via.placeholder.com/400x250/FFD700/FFFFFF?text=Domain+Investment',
    content: [
      {
        type: 'paragraph',
        text: 'In today\'s digital economy, your domain name is more than just a web address—it\'s a valuable business asset that can drive traffic, build trust, and increase your company\'s valuation.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Trust and Credibility'
      },
      {
        type: 'paragraph',
        text: 'Premium .com domains instantly convey professionalism and legitimacy. Customers are more likely to trust and engage with businesses that have authoritative domain names. This trust translates directly into higher conversion rates and customer retention.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'SEO and Marketing Benefits'
      },
      {
        type: 'paragraph',
        text: 'While exact-match domains are less important for SEO than they once were, a strong, brandable domain still provides significant advantages. Premium domains are easier to remember, leading to more direct traffic and stronger brand recall.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Type-in Traffic'
      },
      {
        type: 'paragraph',
        text: 'Many premium domains receive natural type-in traffic from users who guess the domain name based on the business or industry. This organic traffic is incredibly valuable as it represents users with high commercial intent.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Competitive Advantage'
      },
      {
        type: 'paragraph',
        text: 'Owning the premium domain in your industry can prevent competitors from acquiring it and gives you a significant advantage in brand building and market positioning.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Long-term Value'
      },
      {
        type: 'paragraph',
        text: 'Premium domains have historically appreciated in value, often outperforming traditional investments. As the internet continues to grow and premium domains become scarcer, their value is likely to increase further.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Case Studies'
      },
      {
        type: 'paragraph',
        text: 'Companies like Tesla (tesla.com), Uber (uber.com), and countless others have invested heavily in premium domains because they understand the long-term strategic value these assets provide.'
      }
    ]
  },
  {
    id: 3,
    title: 'Domain Name Trends in 2024: What Entrepreneurs Need to Know',
    category: 'Trends',
    date: 'January 5, 2024',
    readTime: '6 min read',
    author: 'Ram Larsson',
    authorTitle: 'Domain Expert',
    image: 'https://via.placeholder.com/400x250/ADD8E6/FFFFFF?text=Domain+Trends',
    content: [
      {
        type: 'paragraph',
        text: 'The domain name landscape continues to evolve, and staying current with trends can give your business a competitive edge. Here are the key trends shaping domain strategy in 2024.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Short and Sweet Wins'
      },
      {
        type: 'paragraph',
        text: 'The trend toward shorter domain names continues to accelerate. Businesses are realizing that brevity leads to better recall, easier typing, and stronger brand impact. Domains under 8 characters are particularly valuable.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Brandable Over Generic'
      },
      {
        type: 'paragraph',
        text: 'Generic keyword domains are giving way to unique, brandable names. Companies want domains that can become synonymous with their brand, rather than generic terms that could apply to any business.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Voice Search Optimization'
      },
      {
        type: 'paragraph',
        text: 'With the rise of voice assistants, domains that are easy to pronounce and spell phonetically are becoming more valuable. Consider how your domain sounds when spoken aloud.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'International Considerations'
      },
      {
        type: 'paragraph',
        text: 'As businesses expand globally, domains that work across languages and cultures are increasingly important. Avoid terms that might have negative connotations in other languages.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Mobile-First Thinking'
      },
      {
        type: 'paragraph',
        text: 'With mobile traffic dominating, domains need to be easy to type on mobile keyboards. This means avoiding complex spellings or characters that are difficult to input on smartphones.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Security and Trust'
      },
      {
        type: 'paragraph',
        text: 'In an era of increasing cyber threats, domains that convey security and trustworthiness are more valuable than ever. Premium .com domains inherently provide this trust factor.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Future-Proofing'
      },
      {
        type: 'paragraph',
        text: 'The best domain investments are those that can adapt to changing business needs. Choose domains that won\'t limit your growth or pivot opportunities.'
      }
    ]
  }
]

function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="SitePot Logo" className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SitePot</h1>
                <p className="text-sm text-gray-600">Premium .com Domains</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Domains</Link>
              <a href="/blog" className="text-blue-600 font-medium">Blog</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </nav>
            <div className="md:hidden">
              {/* Mobile menu button */}
              <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center py-16 bg-white rounded-lg shadow-md mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">Domain <span className="text-blue-600">Insights</span></h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Expert insights, trends, and strategies for choosing, investing in, and maximizing the value of premium domain names.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-1" /> {post.date}
                  <Clock className="w-4 h-4 ml-4 mr-1" /> {post.readTime}
                </div>
                <p className="text-gray-700 mb-4">{post.content[0].text.substring(0, 150)}...</p>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Newsletter Signup */}
        <section className="bg-white rounded-lg shadow-md p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-700 mb-6">
            Get the latest insights on domain investing, market trends, and premium domain opportunities delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} SitePot. All rights reserved.</p>
          <p className="text-sm mt-2">Ram Larsson Digital ENK</p>
        </div>
      </footer>
    </div>
  )
}

export default Blog


