import classNames from 'classnames'
import styles from "./hero.module.scss"
const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={classNames("container", styles.heroContent)}>
        Hero
      </div>
    </div>
  )
}

export default HeroSection