import { motion } from 'framer-motion'

const summary =
  'Detail-oriented and tech-savvy IT student with hands-on experience in system development, data management, and workflow organization. I use web technologies, AI tools, and automation platforms to reduce manual tasks and improve process efficiency while maintaining clean, scalable code.'

function About() {
  const profileImageSrc = `${import.meta.env.BASE_URL}johns_img.png`

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65 }}
    >
      <h3>About Me</h3>
      <div className="about-grid">
        <div className="profile-frame">
          <img
            className="profile-image"
            src={profileImageSrc}
            alt="John Tadeo Liscano profile photo"
          />
        </div>
        <p>{summary}</p>
      </div>
    </motion.section>
  )
}

export default About
