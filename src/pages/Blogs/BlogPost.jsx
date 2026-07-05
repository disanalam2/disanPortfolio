import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageLayout from '../../components/layout/PageLayout';
import Loader from '../../components/common/Loader';
import SEO from '../../components/common/SEO';
import { apiCall } from '../../services/api';
import './blogs.scss';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await apiCall(`/blogs/${slug}`);
        if (data) {
          setBlog(data);
        } else {
          navigate('/blogs');
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug, navigate]);

  if (loading) return <Loader message="Loading Article..." />;
  if (!blog) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": blog.thumbnail,
    "datePublished": blog.created_at,
    "dateModified": blog.updated_at || blog.created_at,
    "author": [{
      "@type": "Person",
      "name": "Disan Alam",
      "url": "https://disanalam.me"
    }]
  };

  return (
    <PageLayout className="blog-post-section">
      <SEO 
        title={`${blog.title} - Disan Alam`} 
        description={blog.summary} 
        url={`blogs/${blog.slug}`}
        image={blog.thumbnail}
        schema={articleSchema}
      />
      
      <div className="blog-layout-wrapper">
        {/* Sticky Sidebar */}
        <aside className="blog-sidebar">
          <Link to="/blogs" className="sidebar-btn back-btn" title="Back to Articles">
            ←
          </Link>
          <button onClick={handleCopyLink} className="sidebar-btn share-btn" title="Copy Link">
            🔗
          </button>
        </aside>

        <article className="blog-container">
          <header className="blog-hero">
            {blog.thumbnail && (
              <div className="blog-hero-image-wrapper">
                <img src={blog.thumbnail} alt={blog.title} className="blog-hero-image" loading="lazy" decoding="async" />
              </div>
            )}
            <h1 className="blog-title">{blog.title}</h1>
            {blog.summary && <p className="blog-summary">{blog.summary}</p>}
            <div className="blog-meta-row">
              <span className="meta-date">{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="meta-dot">•</span>
              <span className="meta-read-time">{blog.read_time || 1} min read</span>
            </div>
          </header>

          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>

      {/* Conversion CTA Funnel Box */}
      <div className="conversion-cta">
        <h2>Is your website ready for the 2026 performance rules?</h2>
        <p>Don't lose mobile traffic to a slow site. Let's modernize your tech stack today.</p>
        <Link 
          to="/contact" 
          state={{ subject: 'Free 2026 Performance Check (Audit Report)' }} 
          className="cta-btn"
        >
          Get a Free Performance Audit
        </Link>
      </div>
    </PageLayout>
  );
};

export default BlogPost;
