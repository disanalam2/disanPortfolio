import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useFetch } from '../../hooks/Fetch';
import { useWrite } from '../../hooks/Write';
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

  // Sync state jab naya data load ho ya cancel dabaya jaye
  useEffect(() => {
    if (aboutData) {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setTempData({ ...tempData, photo: reader.result }); // Base64 string save hogi
      };
      reader.readAsDataURL(file);
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

  if (loading) return <Loader message="Loading Profile Details..." />;

  return (
    <PageLayout className="about-section animate-fade-up">
      <SEO 
        title="About Me" 
        description="Disan Alam is a Professional Full-Stack Web Developer, Website Developer, and Software Engineer. Explore the portfolio of Disan Alam to view real-world projects, technical skills in React.js, Node.js, Express.js, and MySQL, professional experience, and verified certificates. Hire Disan Alam for top-tier custom website development services." 
        url=""
      />
      {isEditing ? (
        <AboutEdit 
          tempData={tempData} 
          imagePreview={imagePreview} 
          handleInputChange={handleInputChange} 
          handleImageChange={handleImageChange} 
        />
      ) : (
        <AboutView aboutData={aboutData || {}} />
      )}

      {isAdmin && (
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