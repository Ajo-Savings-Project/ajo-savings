import { Button, Card, Text } from 'components'
import styles from './exploreGroups.module.scss'
import ForwardIcon from './Icons/ForwardIcon.svg?react'
import Filter from './Icons/Filter.svg?react'
import ThreeDots from './Icons/ThreeDots.svg?react'
import { GroupData } from './mockData'
import { findMissingNumbers } from './helper'

const ExploreGroup = () => {
  return (
    <div className={styles.allContainer}>
      <div className={styles.allContainerOne}>
        <Text content="Active Savings Group" size="Label" />
        <span>
          <ForwardIcon />
        </span>
        <Text content="Explore Groups" />
      </div>
      <div className={styles.allContainerTwo}>
        <Text content="Explore Groups" level={1} />
        <span>
          <Filter />
        </span>
      </div>
      {GroupData.map((group, index) => {
        return (
          <section key={index}>
            <Card
              style={{ width: '100%' }}
              className={styles.layout}
              key={index}
            >
              <div className={styles.layoutleft}>
                <img
                  className={styles.layoutGroupImg}
                  src="https://picsum.photos/200/300"
                  alt=""
                />
              </div>
              <div className={styles.layoutrightOne}>
                <div className={styles.layoutboxtop}>
                  <span>
                    <Text
                      className={styles.layoutGroupStatus}
                      content={group.groupStatus}
                    />
                  </span>
                  <div className={styles.layoutMembersImg}>
                    {group.groupMembers
                      .slice(0, 4)
                      .map((groupMember, index) => {
                        return (
                          <img
                            key={index}
                            src={groupMember.image}
                            alt="group member Image"
                          />
                        )
                      })}

                    <p
                      style={{
                        display: group.allMembers > 4 ? 'grid' : 'none',
                      }}
                    >
                      +
                      {group.allMembers > 4
                        ? group.allMembers - 4
                        : group.allMembers}
                    </p>
                  </div>
                  <Button text="Join" />
                  <ThreeDots />
                </div>
                <Text content={group.groupName} level={3} />
                <Text size="Small" content={group.groupDesc} />
              </div>
              <div className={styles.layoutrightTwo}>
                <div className={styles.layouttableContainer}>
                  <div className={styles.layoutBoxHead}>
                    <div>
                      <Text content={'Contribution'} size={'Small'} />
                    </div>
                    <div>
                      <Text content={'Exp. Withdrawal'} size={'Small'} />
                    </div>
                    <div>
                      <Text content={'Saving Freq'} size={'Small'} />
                    </div>
                    <div>
                      <Text content={'Duration'} size={'Small'} />
                    </div>
                    <div>
                      <Text content={'Available Slot'} size={'Small'} />
                    </div>
                  </div>

                  <div className={styles.layoutBoxBody}>
                    <div>
                      <Text
                        className={styles.layoutBoxBodyHide}
                        content={'Contribution:'}
                        size={'Small'}
                      />
                      <Text
                        content={group.contribution.toString()}
                        size="Small"
                      />
                    </div>
                    <div>
                      <Text
                        className={styles.layoutBoxBodyHide}
                        content={'Exp. Withdrawal:'}
                        size={'Small'}
                      />
                      <Text
                        content={group.expectedWithdrawal.toString()}
                        size="Small"
                      />
                    </div>
                    <div>
                      <Text
                        className={styles.layoutBoxBodyHide}
                        content={'Saving Freq:'}
                        size={'Small'}
                      />
                      <Text content={group.savingFrequency} size="Small" />
                    </div>
                    <div>
                      <Text
                        className={styles.layoutBoxBodyHide}
                        content={'Duration:'}
                        size={'Small'}
                      />
                      <Text
                        content={
                          group.Duration.toString() +
                          (group.savingFrequency == 'Daily' ? ' days' : ' mos')
                        }
                        size="Small"
                      />
                    </div>
                    <div>
                      <Text
                        className={styles.layoutBoxBodyHide}
                        content={'Available Slot:'}
                        size={'Small'}
                      />
                      <Text
                        content={findMissingNumbers(
                          group.allMembers,
                          group.groupMembers.map((member) => member.slot)
                        ).toString()}
                        size="Small"
                      />
                    </div>
                  </div>
                </div>
                <Text
                  className={styles.layoutrightTwoBottom}
                  content="View Group"
                  size="Small"
                />
              </div>
            </Card>
          </section>
        )
      })}
    </div>
  )
}

export default ExploreGroup
