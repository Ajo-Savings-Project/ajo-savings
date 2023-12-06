import classNames from 'classnames'
import { Text } from 'components'
import Instagram from './images/Instagram.png'
import Twitter from './images/Twitter.png'
import Youtube from './images/Youtube.png'
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={classNames('container')}>
        <Text
          font={'Bodoni'}
          className={classNames('app-logo', styles.footerLogo)}
          content={'Ajó Savings'}
          color={'White'}
        />
        <div className={styles.footerEnquiry}>
          <Text content={'For more enquiries:'} color={'White'} />
          <Text content={'helpsupport@easylend.com'} color={'White'} />
        </div>
        <div className={styles.footerCopyAndSocials}>
          <div className={styles.footerSocials}>
            <a href="#" referrerPolicy="no-referrer" target="_blank">
              <img src={Instagram} alt="Instagram logo" />
            </a>
            <a href="#" referrerPolicy="no-referrer" target="_blank">
              <img src={Twitter} alt=" Twitter logo" />
            </a>
            <a href="#" rel="noreferrer" target="_blank">
              <img src={Youtube} alt=" Youtube logo" />
            </a>
          </div>
          <Text className={styles.copy} color={'White'}>
            &copy; 2023 EasyLend. All rights reserved
          </Text>
        </div>
      </div>
    </footer>
  )
}

export default Footer
