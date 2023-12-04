import classNames from 'classnames'
import styles from './footer.module.scss'
import { Text } from 'components'
import Instagram from './images/Instagram.png'
import Twitter from './images/Twitter.png'
import Youtube from './images/Youtube.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={classNames('container')}>
        <Text
          font={'Bodoni'}
          className={classNames('app-logo', styles.logo)}
          content={'Ajó Savings'}
          style={{ color: 'var(--white)' }}
        />
        <div className={styles.footerEnquiry}>
          <Text
            content={'For more enquiries:'}
            className={styles.footerEquiryText}
          />
          <Text
            content={'helpsupport@easylend.com'}
            className={styles.footerEquirysubText}
          />
        </div>
        <div className={styles.footercopyAndSocial}>
          <div className={styles.socials}>
            <a href="http://">
              <img src={Instagram} alt="Instagram logo" />
            </a>
            <a href="http://">
              <img src={Twitter} alt=" Twitter logo" />
            </a>
            <a href="http://">
              <img src={Youtube} alt=" Youtube logo" />
            </a>
          </div>
          <Text
            content={'© 2023 EasyLend. All rights reserved'}
            className={styles.copy}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
