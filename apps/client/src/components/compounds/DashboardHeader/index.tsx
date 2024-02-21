import { useState } from 'react'
import { Popover } from 'react-tiny-popover'
import classNames from 'classnames'
import styles from './dashboardheader.module.scss'
import { Text } from 'components'
import SearchBar from '../SearchBar'

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
        <SearchBar />
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
          <div
            className={styles.headerImage}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <img
              src="https://picsum.photos/30/30"
              alt=""
              className={styles.headerImg}
            />
            <Text
              content={'Deborah'}
              size={'Small'}
              color={'Gray'}
              className={styles.headerText}
            />
          </div>
        </Popover>
      </div>
    </header>
  )
}

export default DashboardHeader
