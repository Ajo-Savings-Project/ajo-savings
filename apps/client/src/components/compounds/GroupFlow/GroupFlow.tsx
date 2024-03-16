import { Text } from 'components'
import ForwardIcon from './Icons/ForwardIcon.svg?react'
import styles from './groupFlow.module.scss'
import { FlowData } from './data'

const getBackgroundColorBasedOnStatus = (status: unknown) => {
  switch (status) {
    case 'Active':
      return 'green'
    case 'Inactive':
      return '#eab308'
    default:
      return 'red'
  }
}

const GroupFlow = () => {
  return (
    <div className={styles.Layout}>
      <div className={styles.LayoutOne}>
        <Text
          content="Active Savings Group"
          size="Small"
          style={{ fontWeight: 'bold' }}
        />
        <span>
          <ForwardIcon />
        </span>
        <div
          className={styles.LayoutOne}
          style={{ background: '#fff', padding: '0.6rem' }}
        >
          <Text
            content="Lagos Corp Members"
            size="Small"
            style={{ fontWeight: 'bold' }}
          />
          <span>
            <ForwardIcon />
          </span>
          <Text content="View Flow" size="Small" />
        </div>
      </div>
      <div className={styles.LayoutTwo}>
        <Text content="Flow" size="Subheading" />
      </div>
      <div className={styles.LayoutThree}>
        {FlowData.map((flow, index) => {
          return (
            <div key={index}>
              <div className={styles.LayoutMainContent}>
                <div className={styles.LayoutMainContentOne}>
                  <img
                    src={flow.img}
                    alt={flow.img}
                    style={{
                      width: '62px',
                      height: '62px',
                      borderRadius: '50%',
                    }}
                  />
                  <div
                    className={styles.LayoutMainContentOneAfter}
                    style={{
                      backgroundColor: getBackgroundColorBasedOnStatus(
                        flow.status
                      ),
                    }}
                  ></div>
                </div>
                <div className={styles.LayoutMainContentTwo}>
                  <Text content={flow.position} size="Label" />
                </div>
                <div className={styles.LayoutMainContentThree}>
                  <div className={styles.LayoutMainContentTabs}>
                    <div className={styles.LayoutTabHeader}>
                      <Text content="Name" size="Small" />
                      <Text content="Contributing" size="Small" />
                      <Text content="Withdrawing" size="Small" />
                      <Text content="Fee" size="Small" />
                      <Text content="Next Cash Out" size="Small" />
                      <Text content="Recent Cash Out" size="Small" />
                    </div>
                    <div className={styles.LayoutTabBody}>
                      <div>
                        <Text
                          content="Name:"
                          size="Small"
                          className={styles.LayoutTabBodyHide}
                        />
                        <Text content={flow.name} />
                      </div>
                      <div>
                        <Text
                          content="Contributing:"
                          size="Small"
                          className={styles.LayoutTabBodyHide}
                        />
                        <Text content={flow.contributing} />
                      </div>
                      <div>
                        <Text
                          content="Withdrawing:"
                          size="Small"
                          className={styles.LayoutTabBodyHide}
                        />
                        <Text content={flow.withdrawing} />
                      </div>
                      <div>
                        <Text
                          content="Fee:"
                          size="Small"
                          className={styles.LayoutTabBodyHide}
                        />
                        <Text content={flow.fee} />
                      </div>
                      <div>
                        <Text
                          content="Next Cash Out:"
                          size="Small"
                          className={styles.LayoutTabBodyHide}
                        />
                        <Text content={flow.nextCashOut} />
                      </div>
                      <div>
                        <Text
                          content="Recent Cash Out:"
                          size="Small"
                          className={styles.LayoutTabBodyHide}
                        />
                        <Text content={flow.recentCashOut} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GroupFlow
