import { motion } from 'framer-motion'
import {
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaServer,
  FaTools,
} from 'react-icons/fa'

const skillGroups = [
  {
    title: 'Frontend',
    items: [
      { icon: <FaHtml5 />, name: 'HTML5' },
      { icon: <FaCss3Alt />, name: 'CSS3' },
      { icon: <FaJs />, name: 'JavaScript' },
      { icon: <FaReact />, name: 'React' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { icon: <FaNodeJs />, name: 'Node.js' },
      { icon: <FaServer />, name: 'Express' },
    ],
  },
  {
    title: 'Database',
    items: [{ icon: <FaDatabase />, name: 'MySQL' }],
  },
  {
    title: 'Tools',
    items: [
      { icon: <FaTools />, name: 'Postman' },
      { icon: <FaGitAlt />, name: 'GitHub' },
    ],
  },
]

function Skills() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
    >
      <h3>Skills</h3>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-group" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </motion.section>
  )
}

export default Skills
