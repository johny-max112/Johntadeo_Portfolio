import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

function Hero() {
  return (
    <section className="section hero-section">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Full Stack Developer
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        John Tadeo Liscano
      </motion.h1>

      <motion.h2
        className="hero-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Full Stack Developer
      </motion.h2>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        I build practical web systems with clean architecture, efficient data
        handling, and user-first interfaces.
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Link to="projects" smooth duration={600} offset={-80} className="btn btn-primary">
          View Projects
        </Link>
        <Link to="contact" smooth duration={600} offset={-80} className="btn btn-secondary">
          Contact Me
        </Link>
      </motion.div>
    </section>
  )
}

export default Hero
