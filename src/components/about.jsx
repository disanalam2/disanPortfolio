import '../styles/about.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.section
      className="about-section container"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="about-details">
        <img src="./DISAN ALAM.JPG" alt="Disan PIC" />
        <h1 className="title">Hi, I’m Disan Alam — full‑stack developer and problem solver. </h1>
        <p className="description">
          I build clean, reliable web applications and tools that turn ideas into polished, user‑focused products. I blend pragmatic engineering with thoughtful design to ship features that matter.
        </p>
        <div className="social-links" aria-label="Social links">
          <a
            href="https://linkedin.com/in/disanalam"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.01 2.5 2.5 0 0 1 0-5Zm.02 7.5H2V21h3V11Zm7.5 0h-2.9V21h3V15.4c0-1.64.42-2.74 2.3-2.74 1.86 0 1.88 1.68 1.88 2.81V21h3v-5.7c0-4.7-2.5-6.9-5.83-6.9-2.75 0-3.97 1.52-4.65 2.57v.03Z" />
            </svg>
          </a>
          <a
            href="https://github.com/disanalam2"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.32 3.53 1.01.11-.79.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.05.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.92 1.24 3.23 0 4.6-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
          </a>
          <a
            href="mailto:disanalamofficial@gmail.com"
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.25 5.5A2.75 2.75 0 0 1 5 2.75h14a2.75 2.75 0 0 1 2.75 2.75v13.2A2.75 2.75 0 0 1 19 21.5H5A2.75 2.75 0 0 1 2.25 18.75V5.5Zm1.5 0v13.25c0 .69.56 1.25 1.25 1.25h13.5c.69 0 1.25-.56 1.25-1.25V5.5l-8.25 5.63L3.75 5.5Zm1.97-.75 6.03 4.12 6.03-4.12H4.22Z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/disanalam2005"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm10 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10zm-5 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm0 2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm4.75-.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
            </svg>
          </a>
          <a
            href="https://wa.me/918789047170"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.668.149-.198.297-.767.966-.941 1.162-.173.198-.347.223-.644.075-1.758-.868-2.903-1.534-4.066-3.45-.307-.528.307-.492.882-1.635.099-.198.05-.371-.025-.52-.075-.149-.668-1.611-.916-2.206-.242-.579-.487-.5-.668-.51-.173-.008-.37-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.478 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.26.488 1.69.625.71.226 1.358.194 1.87.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.01c-4.99 0-9.04-4.05-9.04-9.04 0-4.99 4.05-9.04 9.04-9.04 4.99 0 9.04 4.05 9.04 9.04 0 4.99-4.05 9.04-9.04 9.04m4.98-6.47c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.66.85-.81 1.03-.15.17-.3.19-.56.07-.26-.13-1.1-.41-2.08-1.29-.77-.69-1.29-1.54-1.44-1.8-.14-.26-.01-.4.11-.53.11-.11.25-.28.37-.42.12-.13.16-.26.24-.43.08-.17.04-.32-.02-.45-.07-.13-.58-1.4-.8-1.92-.21-.51-.43-.44-.58-.45-.14-.01-.32-.01-.48-.01-.17 0-.44.06-.67.31-.24.26-.92.9-.92 2.2s.94 2.54 1.07 2.72c.12.17 1.86 2.84 4.52 3.98.63.27 1.12.43 1.5.55.63.18 1.2.15 1.65.09.5-.07 1.54-.63 1.76-1.24.22-.6.22-1.11.16-1.22-.06-.11-.24-.18-.5-.31" />
            </svg>
          </a>
        </div>
        <div className="action-buttons">
          <Link to="/projects" className="btn primary-btn">View My Work</Link>
          <Link to="/contact" className="btn secondary-btn">Contact Me</Link>
        </div>
      </div>
      <div className="about-content">
        
        <p className="description">
          Who I am <br/>
          I’m a software engineer with a passion for building scalable web experiences and automating repetitive workflows. I enjoy taking projects from concept to production, writing maintainable code, and collaborating across design and product teams to deliver measurable value.
        </p>
        <p className="description">
          What I do <br/>
          I work across the full stack: designing APIs, implementing responsive frontends, and optimizing backend services for performance and reliability. I favor pragmatic solutions, testable code, and clear documentation so teams move faster and systems stay resilient.
        </p>
        <p className="description">
          How I work <br/>
          I approach problems by breaking them into small, testable pieces, shipping early, and iterating based on feedback. I value readable code, automated tests, and continuous integration. When not coding, I explore new libraries, contribute to open source, and refine my craft through real projects.
        </p>
      </div>
    </motion.section>
  );
};

export default About;