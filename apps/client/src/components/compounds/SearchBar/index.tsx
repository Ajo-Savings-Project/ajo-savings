import styles from './searchBar.module.scss'
import { Input } from 'components'
import SearchIcon from './search-altsearchIcon.svg?react'

const SearchBar = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerSearchInput}>
        <SearchIcon className={styles.headerSearchIcon} />
        <Input
          className={styles.headerSearchPlaceholder}
          type="text"
          label={''}
          placeholder={'Search'}
        />
      </div>
    </div>
  )
}

export default SearchBar
