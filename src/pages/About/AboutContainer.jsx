import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useFetch } from '../../hooks/Fetch';
import { useWrite } from '../../hooks/Write';
import { BASE_URL } from '../../services/api';
import PageLayout from '../../components/layout/PageLayout';
import Loader from '../../components/common/Loader';
import AdminBottomBar from '../../components/admin/AdminBottomBar';
import AboutView from './AboutView';
import AboutEdit from './AboutEdit';
import SEO from '../../components/common/SEO';
import './About.scss';

const AboutContainer = () => {
  const { isAdmin } = useAuth();
  const { data: aboutData, setData: setAboutData, loading } = useFetch('/about');
  const { putData, isWriting } = useWrite();

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // Sync state jab naya data load ho ya cancel dabaya jaye
  useEffect(() => {
    if (aboutData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTempData(aboutData);
      setImagePreview(aboutData.photo);
    }
  }, [aboutData, isEditing]);

  const handleStartEditing = () => {
    setTempData(aboutData);
    setImagePreview(aboutData.photo);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    let token = sessionStorage.getItem('adminToken');
    if (token) token = token.replace(/^"(.*)"$/, '$1');

    try {
      const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });

      const data = await response.json();
      if (data.success) {
        setImagePreview(data.url);
        setTempData({ ...tempData, photo: data.url });
      } else {
        alert("Upload Failed: " + data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await putData('/about/update', tempData);
      if (response.success) {
        setAboutData(tempData); // UI permanently Update
        setIsEditing(false);
        alert('About details Database me permanently save ho gayi hain!');
      } else {
        alert("Save karne me error aaya.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Backend se connect nahi ho paya!");
    }
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <PageLayout className="about-section animate-fade-up">
      <SEO 
        title="About Me | Disan Alam" 
        description="Disan Alam is a highly skilled Full-Stack Web Developer and Software Engineer specializing in React.js, Node.js, Express.js, and modern database architectures. Hire Disan Alam for custom web applications, performance optimization, and scalable digital solutions." 
        url=""
      />
      {loading ? (
        <AboutView aboutData={{}} />
      ) : isEditing ? (
        <AboutEdit 
          tempData={tempData} 
          imagePreview={imagePreview} 
          handleInputChange={handleInputChange} 
          handleImageChange={handleImageChange} 
          uploading={uploading}
        />
      ) : (
        <AboutView aboutData={aboutData || {}} />
      )}

      {isAdmin && !loading && (
        <AdminBottomBar
          isEditing={isEditing}
          onEdit={handleStartEditing}
          onSave={handleSave}
          onCancel={handleCancel}
          saveLabel={isWriting ? "Saving..." : "Save Changes"}
        />
      )}
    </PageLayout>
  );
};

export default AboutContainer;