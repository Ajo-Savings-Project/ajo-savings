import classNames from 'classnames'
import { Text } from 'components'
import Instagram from './images/instagram.svg?react'
import Twitter from './images/twitter.svg?react'
import Youtube from './images/youtube.svg?react'

import styles from './footer.module.scss'

const socials = [
  { icon: Instagram, link: '#' },
  { icon: Twitter, link: '#' },
  { icon: Youtube, link: '#' },
]

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
            {socials.map(({ icon: Icon, link }, idx) => (
              <a key={idx} href={link} rel="noreferrer" target="_blank">
                <Icon />
              </a>
            ))}
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
