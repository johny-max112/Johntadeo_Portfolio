import { useState } from 'react'
import { Link } from 'react-scroll'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Contact', to: 'contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <Link
          to="home"
          smooth
          duration={600}
          offset={-80}
          className="brand"
          onClick={closeMenu}
        >
          JOHN TADEO LISCANO
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                smooth
                duration={600}
                offset={-80}
                spy
                activeClass="active"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
