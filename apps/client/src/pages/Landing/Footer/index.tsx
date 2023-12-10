import classNames from 'classnames'
import { Text } from 'components'
import { HEADER_TITLE } from 'appConstants'
import Instagram from './images/instagram.svg?react'
import Twitter from './images/twitter.svg?react'
import Youtube from './images/youtube.svg?react'

import styles from './footer.module.scss'

const socials = [
  { icon: Instagram, link: '#', name: 'instagram' },
  { icon: Twitter, link: '#', name: 'twitter' },
  { icon: Youtube, link: '#', name: 'youtube' },
]

const supportEmail = 'helpsupport@easylend.com'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={classNames('container')}>
        <Text
          font={'Bodoni'}
          className={classNames('app-logo', styles.footerLogo)}
          content={HEADER_TITLE}
          color={'White'}
        />
        <div className={styles.footerEnquiry}>
          <Text content={'For more enquiries:'} color={'White'} />
          <Text color={'White'}>
            <a href={`mailto:${supportEmail}`} data-testid="support-email">
              helpsupport@easylend.com
            </a>
          </Text>
        </div>
        <div className={styles.footerCopyAndSocials}>
          <div className={styles.footerSocials}>
            {socials.map(({ icon: Icon, name, link }) => (
              <a
                key={name}
                data-testid={'socials'}
                href={link}
                rel="noreferrer"
                target="_blank"
              >
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
