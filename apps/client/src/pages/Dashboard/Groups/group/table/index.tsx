import React from 'react'
import { Text } from 'components'
import styles from './tableComponent.module.scss'

interface TableRow {
  slot: string
  name: string
  performance: string
}

interface Props {
  data: TableRow[]
}

const TableComponent: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Text content={'Members'} className={styles.member} size={'Small'} />
      <div className={styles.layout}>
        <div className={styles.card}>
          {data.map((item, index) => (
            <div
              key={index}
              className={styles.data}
              style={{
                background:
                  item.slot === 'slot' &&
                  item.name === 'name' &&
                  item.performance === 'performance'
                    ? 'transparent'
                    : 'white',
              }}
            >
              <div className={styles.type}>
                <Text content={item.slot} size={'Small'} />
              </div>
              <div className={styles.type}>
                <Text content={item.name} size={'Small'} />
              </div>
              <div className={styles.type}>
                <Text
                  content={item.performance}
                  size={'Small'}
                  style={{
                    color:
                      item.performance === '90.23%'
                        ? 'var(--Main-primary)'
                        : item.performance === '45.50%'
                          ? 'var(--red)'
                          : item.performance === 'New user'
                            ? 'var(--google-blue)'
                            : 'black',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableComponent
