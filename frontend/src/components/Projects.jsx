import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const projects = [
  {
    name: 'Smart Kiosk System',
    description:
      'Campus information and services kiosk that improves student access to announcements, campus resources, and workflows.',
    stack: ['React', 'Node.js', 'MySQL', 'REST API'],
    github: 'https://github.com/johny-max112/ptckiosk1',
    
  },
  {
    name: 'Enrollment Management System',
    description:
      'A record management platform for adding, editing, and storing student data with backend integration and organized system logic.',
    stack: ['JavaScript+react', 'node.js+Express', 'MySQL', 'Postman'],
    github: 'https://github.com/johny-max112/PNHS_EnrollmentManagementSystem',
    
  },
  {
    name: 'Academic CRUD Systems',
    description:
      'A collection of CRUD-based school projects simulating real workflows and strengthening backend, debugging, and data-structure fundamentals.',
    stack: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    github: 'https://github.com/johny-max112/StudentRecordingSystem',
   
  },
  {
    name:'Point of sale system(POS)',
    description:'Developed a Mini POS system using Full Stack Development with Database integration, using web  technologies, I turn this into a dektop application to simulate real world POS system this application is for Mini Sari-sari store or Grocery Stores',
    stack: ['JavaScript+react', 'node.js+Express', 'Mysql', 'Postman', 'electron.js'],
    github:'https://github.com/johny-max112/mini-pos',
  },
]

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
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <FiGithub /> GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                <FiExternalLink /> Live Demo
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}

export default Projects
