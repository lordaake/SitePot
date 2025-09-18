const fs = require('fs');
const path = require('path');

// Your website's domain
const domain = 'https://sitepot.com';

// Your app's static routes
const staticRoutes = [
  '/',
  '/blog',
];

// --- DYNAMIC ROUTES ---
// This is where you would fetch dynamic data, for example, from an API or a local file.
// For now, we will use a placeholder for your blog posts.
// Replace these with your actual blog post slugs/IDs.
const dynamicBlogPosts = [
  { id: 'example-post-1' },
  { id: 'example-post-2' },
  // Add more blog posts here as your site grows
];
// --- END DYNAMIC ROUTES ---

const createSitemap = () => {
  const today = new Date().toISOString().split('T')[0];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `
  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
${dynamicBlogPosts.map(post => `
  <url>
    <loc>${domain}/blog/${post.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`;

  return sitemapContent.trim();
};

const sitemap = createSitemap();
const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemap);

console.log('✅ Sitemap generated successfully at public/sitemap.xml');