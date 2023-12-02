import classNames from 'classnames'
import styles from './hero.module.scss'
import { Text } from 'components'
import HeroImg from './hero-img.png'
import { Button } from 'components'
const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={classNames('container', styles.heroContent)}>
        <div className={styles.heroContainer}>
          <div className={styles.heroSubTxt}>
            <Text className={styles.Text} size={'Subheading'}>
              Achieve Financial Success with{' '}
              <span style={{ color: 'var(--primary-600)' }}>Ajó:</span> The
              Future of{' '}
              <span
                style={{ color: 'var(--primary-600)' }}
                className={styles.span}
              >
                Smart Savings.
              </span>
            </Text>
            <Text className={styles.heroSubText}>
              Experience the convenience of secure group savings and
              personalized savings plans with Ajó Savings. Take control of your
              finances and unlock a brighter financial future.
            </Text>
            <Button kind="default" text="Get Started" />
          </div>
          <div className={styles.heroHeroImg}>
            <img src={HeroImg} alt="Hero Image" className={styles.HeroImg} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
