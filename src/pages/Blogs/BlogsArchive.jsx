import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useAuth } from '../../context/authContext';
import { useFetch } from '../../hooks/Fetch';
import { useWrite } from '../../hooks/Write';
import { useRefresh } from '../../context/RefreshContext';
import PageLayout from '../../components/layout/PageLayout';
import socket from '../../services/socket';
import Loader from '../../components/common/Loader';
import AdminBottomBar from '../../components/admin/AdminBottomBar';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import SectionTitle from '../../components/ui/SectionTitle';
import SEO from '../../components/common/SEO';
import '../Projects/projects.scss'; // Reusing projects css for grid layout

const BlogsArchive = () => {
  const { isAdmin } = useAuth();
  const { data: blogsData, setData: setBlogsData, loading } = useFetch(isAdmin ? '/blogs/admin' : '/blogs');
  const { postData, putData, deleteData } = useWrite();
  const { triggerRefresh } = useRefresh();

  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Real-time synchronization
  useEffect(() => {
    const handleBlogChange = () => {
      triggerRefresh();
    };

    socket.on('newBlog', handleBlogChange);
    socket.on('updateBlog', handleBlogChange);
    socket.on('deleteBlog', handleBlogChange);

    return () => {
      socket.off('newBlog', handleBlogChange);
      socket.off('updateBlog', handleBlogChange);
      socket.off('deleteBlog', handleBlogChange);
    };
  }, [triggerRefresh]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (blogsData) setTempData(blogsData);
  }, [blogsData]);

  // Page level editing
  const handleStartEditingPage = () => {
    setTempData(JSON.parse(JSON.stringify(blogsData || [])));
    setIsEditingPage(true);
  };
  const handleSavePage = () => {
    setBlogsData(tempData);
    setIsEditingPage(false);
    setEditingBlogId(null);
  };
  const handleCancelPage = () => {
    setTempData([...(blogsData || [])]);
    setIsEditingPage(false);
    setEditingBlogId(null);
  };

  // Backend Actions
  const handleAddBlog = async () => {
    // Schedule new blogs 1 year in the future by default
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const scheduledDateISO = futureDate.toISOString();

    const newTemplate = { 
      title: "New Blog", 
      slug: `new-blog-${Date.now()}`, 
      summary: "Summary here...", 
      content: "## Hello World", 
      thumbnail: "", 
      scheduledFor: scheduledDateISO 
    };
    
    try {
      const response = await postData('/blogs/add', newTemplate);
      if (response.success) {
        const newBlog = { ...newTemplate, id: response.insertId };
        setTempData([newBlog, ...tempData]);
        setBlogsData([newBlog, ...(blogsData || [])]);
        setEditingBlogId(response.insertId);
      }
    } catch (error) { alert(error.response?.data?.message || "Failed to add blog"); }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog permanently?")) {
      try {
        const response = await deleteData(`/blogs/delete/${id}`);
        if (response.success) {
          setTempData(tempData.filter(b => b.id !== id));
          setBlogsData((blogsData || []).filter(b => b.id !== id));
        }
      } catch (error) { console.error("Delete error:", error); }
    }
  };

  const saveBlogDetails = async (id, updatedData) => {
    try {
      // If it's a new unsaved one but we don't have id, wait, handleAddBlog already generated an ID.
      const response = await putData(`/blogs/update/${id}`, updatedData);
      if (response.success) {
        const finalData = tempData.map(b => b.id === id ? { ...updatedData, id } : b);
        setTempData(finalData);
        setBlogsData(finalData);
        setEditingBlogId(null);
        alert("Blog updated successfully!");
      }
    } catch (error) { alert(error.response?.data?.message || "Error saving blog!"); }
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <Loader message="Loading Articles..." />;
  const now = currentTime;
  const displayData = isEditingPage 
    ? tempData 
    : (blogsData || []).filter(blog => {
        if (isAdmin) return true;
        if (!blog.scheduledFor) return true;
        
        let dateStr = blog.scheduledFor;
        if (!dateStr.includes('Z') && !dateStr.includes('+')) {
            if (dateStr.includes(' ')) dateStr = dateStr.replace(' ', 'T');
            dateStr += 'Z';
        }
        
        return new Date(dateStr) <= now;
      });

  // Generate dynamic keywords for SEO
  let dynamicKeywords = "Blogs, Articles, Tech Insights, Web Development";
  if (blogsData && blogsData.length > 0) {
    const allTitles = blogsData.map(b => b.title).join(' ').split(' ');
    // Filter out short words to make somewhat decent keywords
    const keywords = allTitles.filter(word => word.length > 4).slice(0, 10).join(', ');
    if (keywords) {
      dynamicKeywords = `Blogs, ${keywords}`;
    }
  }

  return (
    <PageLayout className="projects-section">
      <SEO 
        title="Articles & Blogs | Disan Alam" 
        description="Read the latest articles, tutorials, and tech insights written by Disan Alam on Web Development, System Architecture, and Software Engineering best practices." 
        url="blogs"
        keywords={dynamicKeywords}
      />
      <SectionTitle title="Articles & Insights" />
      
      {displayData?.length === 0 && !isEditingPage && (
        <p className="empty-state">No articles published yet. Check back soon!</p>
      )}

      <div className="projects-container">
        {displayData?.map((blog, index) => (
          <Tilt
            key={blog.id}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            transitionSpeed={1000}
            scale={1.02}
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#ffffff"
            glarePosition="all"
            className="tilt-wrapper"
            tiltEnable={!isEditingPage}
            style={{ display: 'flex', height: '100%' }}
          >
            <motion.div
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              style={{ width: '100%' }}
            >
              {editingBlogId === blog.id ? (
                <BlogForm blog={blog} onSave={saveBlogDetails} onCancel={() => setEditingBlogId(null)} />
              ) : (
                <BlogCard 
                  blog={blog} 
                  isEditingPage={isEditingPage} 
                  onEdit={() => setEditingBlogId(blog.id)} 
                  onDelete={() => handleDeleteBlog(blog.id)} 
                />
              )}
            </motion.div>
          </Tilt>
        ))}

        {isEditingPage && (
          <div className="project-card add-new-card" onClick={handleAddBlog}>
            <div className="add-content">
              <span className="plus-icon">+</span>
              <h3>Write New Article</h3>
            </div>
          </div>
        )}
      </div>

      {isAdmin && (
        <AdminBottomBar isEditing={isEditingPage} onEdit={handleStartEditingPage} onSave={handleSavePage} onCancel={handleCancelPage} />
      )}
    </PageLayout>
  );
};

export default BlogsArchive;
