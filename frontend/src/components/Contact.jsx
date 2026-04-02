import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

function Contact() {
  const [formData, setFormData] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormData(initialForm)
  }

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
    >
      <h3>Contact</h3>
      <div className="contact-grid">
        <div className="contact-links">
          <a href="mailto:liscanojohntadeo15@gmail.com">
            <FiMail /> liscanojohntadeo15@gmail.com
          </a>
          <a href="tel:+639911437415">
            <FiPhone /> +63 991 143 7415
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <FiGithub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/john-tadeo-liscano-500a61376"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin /> LinkedIn
          </a>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  )
}

export default Contact
