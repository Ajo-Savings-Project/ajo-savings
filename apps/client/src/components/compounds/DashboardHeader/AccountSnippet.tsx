import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Popover } from 'react-tiny-popover'
import { useAuth } from '../../../contexts'
import routes from '../../../router/routes.ts'
import { capitalizeWord } from '../../../utils/stringManip.ts'
import { Text } from '../../elements'
import styles from './dashboardheader.module.scss'

const AccountSnippet = () => {
  const { firstName, profilePic } = useAuth()

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        positions={['bottom']}
        reposition
        onClickOutside={() => setIsPopoverOpen(false)}
        content={
          <ul className={styles.snippetDrop}>
            <li>
              <Link
                to={routes.dashboard.settings.abs_path.concat('#upload-image')}
              >
                <Text size={'Small'} style={{ marginBottom: '15px' }}>
                  Upload Picture
                </Text>
              </Link>
            </li>
            <li>
              <Link
                to={routes.dashboard.settings.abs_path.concat(
                  '#change-password'
                )}
              >
                <Text size={'Small'}>Change Password</Text>
              </Link>
            </li>
          </ul>
        }
      >
        <div
          className={styles.headerImage}
          role={'presentation'}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <img
            src={profilePic}
            alt={`profile picture of ${firstName}`}
            className={styles.headerImg}
          />
          <Text
            content={capitalizeWord(firstName || '__')}
            size={'Small'}
            color={'Gray'}
            className={styles.headerText}
          />
        </div>
      </Popover>
    </>
  )
}

export default AccountSnippet
