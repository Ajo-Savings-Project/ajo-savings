import classNames from 'classnames'
import { Button, Text } from 'components'
import { Link } from 'react-router-dom'
import { HEADER_TITLE } from 'appConstants'
import styles from './header.module.scss'

const Header = () => {
  return (
    <div className={classNames('container', styles.header)}>
      <Text
        className={classNames('app-logo')}
        color={'none'}
        font={'Bodoni'}
        content={HEADER_TITLE}
      />
      <Link to="/dashboard">
        <Button text={'Get Started'} />
      </Link>
    </div>
  )
}

export default Header
