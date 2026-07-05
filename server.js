import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;
const API_BASE_URL = 'https://api.disanalam.me/api';

// Serve static files (js, css, images) from the dist folder
// We don't serve index.html directly here to allow interception
app.use(express.static(path.join(__dirname, 'dist'), { index: false }));

app.get('/blogs/:slug', async (req, res) => {
  const { slug } = req.params;
  const indexPath = path.join(__dirname, 'dist', 'index.html');

  try {
    // Read the static index.html
    let html = fs.readFileSync(indexPath, 'utf-8');

    // Fetch blog details from the API
    const apiRes = await fetch(`${API_BASE_URL}/blogs/${slug}`);
    
    if (apiRes.ok) {
      const blog = await apiRes.json();
      
      const title = `${blog.title} - Disan Alam`;
      const description = blog.summary || "Read the latest blog post by Disan Alam.";
      const image = blog.thumbnail || "https://disanalam.me/banner.webp";
      const url = `https://disanalam.me/blogs/${slug}`;

      // Inject tags into the HTML
      html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      html = html.replace(/<meta name="title" content=".*?">/, `<meta name="title" content="${title}">`);
      html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`);
      
      // Open Graph
      html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${title}">`);
      html = html.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${description}">`);
      html = html.replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${image}">`);
      html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="${url}">`);

      // Twitter
      html = html.replace(/<meta property="twitter:title" content=".*?">/, `<meta property="twitter:title" content="${title}">`);
      html = html.replace(/<meta property="twitter:description" content=".*?">/, `<meta property="twitter:description" content="${description}">`);
      html = html.replace(/<meta property="twitter:image" content=".*?">/, `<meta property="twitter:image" content="${image}">`);
    }

    res.send(html);
  } catch (err) {
    console.error("Error fetching blog for SEO:", err);
    // Fallback to normal index.html if API fails
    res.sendFile(indexPath);
  }
});

// For all other routes, serve the normal index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
