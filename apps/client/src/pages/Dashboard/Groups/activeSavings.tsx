import { Link } from 'react-router-dom'
import { Modal } from 'components'
import { routes } from 'router'
import ExploreGroupView from 'components/compounds/GroupView/ExploreGroupView'

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
      <ExploreGroupView />
    </div>
  )
}

export default ActiveSavings
