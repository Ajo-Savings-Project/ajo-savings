import { useState } from 'react'
import { Popover } from 'react-tiny-popover'
import classNames from 'classnames'
import styles from './dashboardheader.module.scss'
import ProfilePicture from './DefaultAjo-dp.svg?react'
import SearchIcon from './search-altsearchIcon.svg?react'
import { Input, Text } from 'components'

const DashboardHeader = ({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <header className={classNames('container', styles.header, className)}>
      <button onClick={onClick}>T</button>
      <div>
        <div className={styles.headerSearchInput}>
          <SearchIcon className={styles.headerSearchIcon} />
          <Input
            className={styles.headerSearchPlaceholder}
            type="text"
            label={''}
            placeholder={'Search'}
          />
        </div>
        <Popover
          isOpen={isPopoverOpen}
          positions={['bottom']}
          onClickOutside={() => setIsPopoverOpen(false)}
          content={
            <div
              style={{
                backgroundColor: 'white',
                margin: '5px',
                textAlign: 'start',
                color: 'black',
                padding: '20px',
              }}
            >
              <Text size={'Small'} style={{ marginBottom: '15px' }}>
                Upload Picture
              </Text>
              <Text size={'Small'}>Change Password</Text>
            </div>
          }
        >
          <div className={styles.headerImage}>
            <ProfilePicture onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
            <Text
              content={'Deborah'}
              size={'Small'}
              color={'Gray'}
              className={styles.headerText}
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            />
          </div>
        </Popover>
      </div>
    </header>
  )
}

export default DashboardHeader
