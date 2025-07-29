// src/pages/BlogPage.jsx
import BlogPostCard from '../components/BlogPostCard'; // Import the new component

// Sample data for blog posts. In a real app, you would fetch this from an API.
const mockPosts = [
    {
        id: 1,
        slug: 'the-rise-of-generative-ai',
        title: 'The Unstoppable Rise of Generative AI in 2025',
        excerpt: 'Explore how generative AI is reshaping industries, from content creation to complex problem-solving. What does the future hold?',
        imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=1974&auto=format&fit=crop',
        author: 'Jane Doe',
        date: 'July 25, 2025',
    },
    {
        id: 2,
        slug: 'top-5-ai-tools-for-developers',
        title: 'Top 5 AI Tools That Every Developer Should Know',
        excerpt: 'Boost your productivity and code quality with these essential AI-powered tools. A deep dive into GitHub Copilot, Tabnine, and more.',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        author: 'John Smith',
        date: 'July 18, 2025',
    },
    {
        id: 3,
        slug: 'navigating-the-ethics-of-ai',
        title: 'Navigating the Ethical Maze of Artificial Intelligence',
        excerpt: 'As AI becomes more powerful, the ethical questions become more complex. We discuss bias, privacy, and accountability in AI systems.',
        imageUrl: 'https://images.unsplash.com/photo-1531771686278-278545939283?q=80&w=1974&auto=format&fit=crop',
        author: 'Alex Ray',
        date: 'July 10, 2025',
    },
    // Add more mock posts here if you like
];

export default function BlogPage() {
    return (
        <main className="pt-24 pb-16"> {/* Increased padding for better spacing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl md:text-5xl font-montserrat">
                        Insights
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto md:text-xl text-l text-gray-600 dark:text-gray-300">
                        Discover the latest articles, insights, and updates on AI tools and technology.
                    </p>
                </div>

                {/* Blog Post Grid */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
                    {mockPosts.length > 0 ? (
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            {/* We map over the mockPosts array and render a card for each post */}
                            {mockPosts.map((post) => (
                                <BlogPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        // This message will show if the mockPosts array is empty
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Coming Soon!</h2>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                No posts yet, but our team is hard at work. Check back soon for exciting content!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
