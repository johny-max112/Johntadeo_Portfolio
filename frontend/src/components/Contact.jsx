import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

// Set VITE_API_URL in a .env file to point at your deployed backend.
// Defaults to the local Express dev server.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Contact() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send message.')
      }

      setStatus({ type: 'success', message: 'Thanks! Your message has been sent.' })
      setFormData(initialForm)
    } catch (err) {
      setStatus({
        type: 'error',
        message:
          err.message || 'Sorry, something went wrong. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
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
          <a href="https://github.com/johny-max112" target="_blank" rel="noreferrer">
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

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
          {status.type !== 'idle' && (
            <p
              className={`form-status form-status--${status.type}`}
              role={status.type === 'error' ? 'alert' : 'status'}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </motion.section>
  )
}

export default Contact
