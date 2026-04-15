import '../styles/about.scss';

const About = () => {
  return (
    <section className="about-section container">
      <div className="about-details">
        <img src="./src/assets/DISAN ALAM.JPG" alt="Disan PIC" />
        <h1 className="title">Hi, I’m Disan Alam — full‑stack developer and problem solver. </h1>
        <p className="description">
          I build clean, reliable web applications and tools that turn ideas into polished, user‑focused products. I blend pragmatic engineering with thoughtful design to ship features that matter.
        </p>
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
        <div className="action-buttons">
          <a href="/projects" className="btn primary-btn">View My Work</a>
          <a href="/contact" className="btn secondary-btn">Contact Me</a>
        </div>
      </div>
    </section>
  );
};

export default About;