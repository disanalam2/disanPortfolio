import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} - Disan Alam | Full-Stack Developer`;
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useTitle;
