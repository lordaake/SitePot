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
// This array should list the ID of each post from your 'src/data/blogData.js' file.
// Manually add a new object here whenever you create a new blog post.
const dynamicBlogPosts = [
  { id: 1 }, // This corresponds to your "SitePot Has Launched" post.
  // When you add a new post with id: 2, add '{ id: 2 },' on the next line.
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