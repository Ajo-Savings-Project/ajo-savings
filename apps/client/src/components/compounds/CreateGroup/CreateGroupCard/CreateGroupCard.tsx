import { PropsWithChildren } from 'react'
import styles from './createGroupCard.module.scss'
import { ModalCard, Text } from 'components'
import Check from '../../InfoCard/images/CheckOutline.svg?react'
import Facebook from './images/facebook_icon.svg?react'
import Twitter from './images/twitter logo_icon.svg?react'
import Instagram from './images/instagram_icon.svg?react'
import Telegram from './images/telegram_icon.svg?react'
import Gmail from './images/gmail.svg?react'

interface CreateGroupsCardProps {
  text: string
  Subtext: string
  onClick: () => void
}
const CreateGroupCard = ({
  text,
  Subtext,
  onClick,
}: PropsWithChildren<CreateGroupsCardProps>) => {
  return (
    <ModalCard onClick={onClick} className={styles.cardContainer}>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyLogo}>
          <Check />
        </div>
        <Text size={'Label'} content={text} className={styles.cardBodyText} />
        <Text content={Subtext} size={'Small'} />
        <Text
          size={'Small'}
          content="Share on social media:"
          className={styles.cardBodyShare}
        />
        <span className={styles.cardBodySocials}>
          <a href="#">
            <Facebook />
          </a>
          <a href="#">
            <Instagram />
          </a>
          <a href="#">
            <Telegram />
          </a>
          <a href="#">
            <Twitter />
          </a>
          <a href="#">
            <Gmail />
          </a>
        </span>
      </div>
    </ModalCard>
  )
}
export default CreateGroupCard
