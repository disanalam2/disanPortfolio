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
import SectionTitle from '../../components/ui/SectionTitle';
import SocialLinks from '../../components/common/SocialLinks';
import SEO from '../../components/common/SEO';
import './About.scss';

const DEFAULT_BOX3 = {
  cap1: 'Agentic AI Automation',
  cap2: 'Real-Time WebSocket Pipelines',
  cap3: 'Cloud-Native Microservices',
  cap4: 'OWASP & API Security',
  subtext: 'Zero-Downtime Distributed Systems',
};

const AboutContainer = () => {
  const { isAdmin } = useAuth();
  const { data: aboutData, setData: setAboutData, loading } = useFetch('/about');
  const { data: experienceData } = useFetch('/experience');
  const { data: projectsData } = useFetch('/projects');
  const { data: skillsData } = useFetch('/skills');
  const { putData, isWriting } = useWrite();

  const [box3Config, setBox3Config] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_box3_capabilities');
      return saved ? JSON.parse(saved) : DEFAULT_BOX3;
    } catch {
      return DEFAULT_BOX3;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // Sync state jab naya data load ho ya cancel dabaya jaye
  useEffect(() => {
    if (aboutData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTempData({
        ...aboutData,
        box3_cap1: box3Config.cap1,
        box3_cap2: box3Config.cap2,
        box3_cap3: box3Config.cap3,
        box3_cap4: box3Config.cap4,
        box3_subtext: box3Config.subtext,
      });
      setImagePreview(aboutData.photo);
    }
  }, [aboutData, isEditing, box3Config]);

  const handleStartEditing = () => {
    setTempData({
      ...aboutData,
      box3_cap1: box3Config.cap1,
      box3_cap2: box3Config.cap2,
      box3_cap3: box3Config.cap3,
      box3_cap4: box3Config.cap4,
      box3_subtext: box3Config.subtext,
    });
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
    const updatedBox3 = {
      cap1: tempData.box3_cap1 !== undefined ? tempData.box3_cap1 : box3Config.cap1,
      cap2: tempData.box3_cap2 !== undefined ? tempData.box3_cap2 : box3Config.cap2,
      cap3: tempData.box3_cap3 !== undefined ? tempData.box3_cap3 : box3Config.cap3,
      cap4: tempData.box3_cap4 !== undefined ? tempData.box3_cap4 : box3Config.cap4,
      subtext: tempData.box3_subtext !== undefined ? tempData.box3_subtext : box3Config.subtext,
    };
    setBox3Config(updatedBox3);
    try {
      localStorage.setItem('portfolio_box3_capabilities', JSON.stringify(updatedBox3));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

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
    <PageLayout className="about-page">
      <SEO 
        title="Disan Alam | Full-Stack Systems Architect & AI Business Solutions" 
        description="Disan Alam is a Full-Stack Systems Architect and AI Solutions Consultant. Deep industry discovery, bespoke web engineering, Agentic AI workflows, custom RAG integrations, and AWS cloud systems." 
        url="https://www.disanalam.me/"
      />
      <SectionTitle 
        title="About Me" 
        subtitle={isEditing ? tempData?.title : (aboutData?.title || "AI Systems Architect & Full-Stack Engineer")} 
        rightElement={<SocialLinks />}
      />

      <div className="about-section">
        {loading ? (
          <AboutView aboutData={{}} experienceData={experienceData} projectsData={projectsData} skillsData={skillsData} box3Config={box3Config} />
        ) : isEditing ? (
          <AboutEdit 
            tempData={tempData} 
            imagePreview={imagePreview} 
            handleInputChange={handleInputChange} 
            handleImageChange={handleImageChange} 
            uploading={uploading}
            box3Config={box3Config}
          />
        ) : (
          <AboutView aboutData={aboutData || {}} experienceData={experienceData} projectsData={projectsData} skillsData={skillsData} box3Config={box3Config} />
        )}
      </div>

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