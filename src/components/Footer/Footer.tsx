import styles from './Footer.module.css'

const Footer = () => {
  return (
  <div className={styles.container}>
    <footer>
      <div className={styles.authors}>
        <div className={styles.author}>
          <p className={styles.authorName}>Yan Shi</p>
          <a href="https://github.com/leonshiyan" className={styles.authorLink}>GitHub</a>
        </div>
        <p>
          <img
              alt=""
              src="/bus.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
          />© 2023 BusBuddy All rights reserved.</p>
      </div>
    </footer>
  </div>
  )
}

export default Footer