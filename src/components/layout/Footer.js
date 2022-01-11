import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
    <ul className={styles.socialList}>
      <li><FaFacebook  /> </li>
      <li><FaInstagram  /> </li>
      <li><FaLinkedin  /> </li>
      <li><FaGithub  /> </li>
    </ul>
    <p><span>Costs</span> desenvolvido com React.js e com ❤️</p>
  </footer>
  )
}
