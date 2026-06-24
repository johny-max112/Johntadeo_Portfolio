import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    name: "Smart Kiosk System",
    description:
      "Campus information and services kiosk that improves student access to announcements, campus resources, and workflows.",
    stack: ["React", "Node.js", "MySQL", "REST API"],
    github: "https://github.com/johny-max112/ptckiosk1",
  },
  {
    name: "Enrollment Management System",
    description:
      "A record management platform for adding, editing, and storing student data with backend integration and organized system logic.",
    stack: ["JavaScript+react", "node.js+Express", "MySQL", "Postman"],
    github: "https://github.com/johny-max112/PNHS_EnrollmentManagementSystem",
  },
  {
    name: "Website Funnel For Financial Advisor",
    description:
      "A website funnel for a financial advisor that provides information about services, testimonials, and a contact form for potential clients intigrated with airtable database for lead capture and automation that send automated follow-up emails.",
    stack: ["React + Vite", "CSS", "JavaScript", "SQL"],
    github:
      "https://github.com/johny-max112/Salon_Funnel_WithBooking_AppointmentLoive",
    demo: "https://yumijofinancialadvisor.vercel.app/",
  },
  {
    name: "Point of sale system(POS)",
    description:
      "Developed a Mini POS system using Full Stack Development with Database integration, using web  technologies, I turn this into a dektop application to simulate real world POS system this application is for Mini Sari-sari store or Grocery Stores",
    stack: [
      "JavaScript+react",
      "node.js+Express",
      "Mysql",
      "Postman",
      "electron.js",
    ],
    github: "https://github.com/johny-max112/mini-pos",
  },
  {
    name: "Type Tiles - Falling Word Typing Game",
    description:
      "A fast-paced typing game where words fall from the top of the screen and the player must type them correctly before they reach the bottom. Built with Phaser.js for smooth 2D game mechanics and TypeScript for type-safe, scalable game logic.",
    stack: ["TypeScript", "Phaser.js"],
    github: "",
    demo: "",
  },
];

function Projects() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65 }}
    >
      <h3>Projects</h3>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            className="project-card"
            key={project.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <div className="badge-list">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  <FiGithub /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;
