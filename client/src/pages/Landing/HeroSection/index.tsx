import classNames from 'classnames'
import styles from "./hero.module.scss"
import { Text } from 'components'
import HeroImg from "../../../assets/hero-img.svg"
import { Button } from 'components'
const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={classNames("container", styles.heroContent)}>
        <div className={styles.heroContainer}>
          <div className={styles.heroRight}>
            <img src={HeroImg} alt="Hero Image" className={styles.HeroImg} />
          </div>
          <div className={styles.heroLeft}>
            <div className={styles.inner}>
              <Text className={styles.heroText} level={4} font={"Inter"} size={'Subheading'}>Achieve Financial Success with <span style={{ color: "#088AB2 " }}>Ajó:</span> The Future of <span style={{ color: "#088AB2 " }} className={styles.span}>Smart Savings.</span> </Text>
              <Text className={styles.heroSubText} font={"Inter"} level={4} size={"Label"}>Experience the convenience of secure group savings and personalized savings plans with Ajó Savings. Take control of your finances and unlock a brighter financial future.</Text>
            </div>
            <div className={styles.heroBtn}>
              <Button kind='default' text='Get Started' />
            </div>





          </div>


        </div>
      </div>
    </div>
  )
}

export default HeroSection


{/* <div>
<div className={styles.imgContainer}>
  <img src={HeroImg} alt="Hero Image" className={styles.HeroImg} width={390} height={270} />
</div>

</div> */}
