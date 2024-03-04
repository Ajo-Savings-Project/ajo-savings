import { Link } from 'react-router-dom'
import { Modal } from 'components'
import { routes } from 'router'

const ActiveSavings = () => {
  return (
    <div>
      Active savings
      <Modal
        renderOnOpen={({ onOpen }) => (
          <button onClick={onOpen}>Create new group</button>
        )}
        renderModalContent={() => <div>Create new group body</div>}
      />
      or
      <Link to={routes.dashboard.groups.abs_path + '?page=explore'}>
        Explore Groups
      </Link>
    </div>
  )
}

export default ActiveSavings
