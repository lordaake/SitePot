
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react'
import { blogPosts } from './Blog'
import logo from '../assets/logo.png'

function BlogPost() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Blog Post Not Found</h1>
          <p className="text-lg text-gray-700 mb-8">The post you are looking for does not exist.</p>
          <Link to="/blog" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    )
  }

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
              <Link to="/blog" className="text-blue-600 font-medium">Blog</Link>
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
        <article className="bg-white rounded-lg shadow-md p-8 mb-12">
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold mr-4">
              {post.category}
            </span>
            <Calendar className="w-4 h-4 mr-1" /> {post.date}
            <Clock className="w-4 h-4 ml-4 mr-1" /> {post.readTime}
          </div>
          <img src={post.image} alt={post.title} className="w-full h-80 object-cover rounded-lg mb-8" />
          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return <p key={index} className="mb-4">{block.text}</p>
              } else if (block.type === 'heading') {
                const HeadingTag = `h${block.level}`
                return <HeadingTag key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{block.text}</HeadingTag>
              }
              return null
            })}
          </div>
          <div className="flex items-center mt-8 pt-6 border-t border-gray-200">
            <User className="w-10 h-10 text-gray-500 mr-4" />
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-600">{post.authorTitle}</p>
            </div>
          </div>
        </article>
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

export default BlogPost


