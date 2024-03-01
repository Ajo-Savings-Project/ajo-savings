import { Card, Text } from 'components'
import { GroupData } from './Data'
import classNames from 'classnames'
import styles from './myActiveSavings.module.scss'
import ThreeDots from './Icons/ThreeDots.svg?react'
// import { Link } from 'react-router-dom'
import { Popover } from 'react-tiny-popover'
import { useState } from 'react'

const MyActiveSavings = () => {
  const [popoverOpen, setPopoverOpen] = useState<boolean[]>(
    Array(GroupData.length).fill(false)
  )

  const handleTogglePopover = (index: number) => {
    const newPopoverState = [...popoverOpen]
    newPopoverState[index] = !newPopoverState[index]
    setPopoverOpen(newPopoverState)
  }

  return (
    <section className={styles.Container}>
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
                      className={classNames(styles.layoutGroupStatus, {
                        [styles.ongoing]: group.groupStatus === 'Ongoing',
                        [styles.other]: group.groupStatus !== 'Ongoing',
                      })}
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
                  <div>
                    <Popover
                      isOpen={popoverOpen[index]}
                      positions={['bottom']}
                      reposition
                      onClickOutside={() => handleTogglePopover(index)}
                      content={
                        <ul className={styles.layoutSnippetDrop}>
                          <li>
                            {/* <Link
                                                            to={routes.dashboard.settings.abs_path.concat('#upload-image')}
                                                        > */}
                            <Text size={'Small'}>Leave Group</Text>
                            {/* </Link> */}
                          </li>
                          <li>
                            {/* <Link
                                                            to={routes.dashboard.settings.abs_path.concat('#upload-image')}
                                                        > */}
                            <Text size={'Small'}>Report Group</Text>
                            {/* </Link> */}
                          </li>
                          <li>
                            {/* <Link
                                                            to={routes.dashboard.settings.abs_path.concat('#upload-image')}
                                                        > */}
                            <Text
                              size={'Small'}
                              style={{ marginBottom: '15px' }}
                            >
                              View Details
                            </Text>
                            {/* </Link> */}
                          </li>
                        </ul>
                      }
                    >
                      <div
                        role="presentation"
                        onClick={() => handleTogglePopover(index)}
                      >
                        <ThreeDots />
                      </div>
                    </Popover>
                  </div>
                </div>
                <Text content={group.groupName} level={3} />
              </div>
              <div className={styles.layoutrightTwo}>
                <div className={styles.layouttableContainer}>
                  <div className={styles.layoutBoxHead}>
                    <div>
                      <Text content={'Saving'} size={'Small'} />
                    </div>
                    <div>
                      <Text content={'Withdrawal'} size={'Small'} />
                    </div>
                    <div>
                      <Text content={'Saving Freq'} size={'Small'} />
                    </div>
                    <div>
                      <Text content={'Duration'} size={'Small'} />
                    </div>
                    <div>
                      <Text content={'Cash Out Date'} size={'Small'} />
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
                      <Text content={group.cashOutDate} size="Small" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )
      })}
    </section>
  )
}

export default MyActiveSavings
