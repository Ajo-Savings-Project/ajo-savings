import { Button, Card, Text } from 'components'
import styles from './exploreGroups.module.scss'

function findMissingNumbers(number: number, inputArray: number[]) {
  if (!Array.isArray(inputArray) || typeof number !== 'number') {
    console.error('Invalid input. Please provide a number and an array.')
    return []
  }

  const lessThanOrEqualNumber = inputArray.filter((num) => num <= number)

  const missingNumbers = []
  for (let i = 1; i <= number; i++) {
    if (!lessThanOrEqualNumber.includes(i)) {
      missingNumbers.push(i)
    }
  }

  return (
    missingNumbers.slice(0, -1).join(', ') +
    (missingNumbers.length > 1
      ? ` and ${missingNumbers[missingNumbers.length - 1]}`
      : '')
  )
}

const GroupData = [
  {
    groupStatus: 'Waiting',
    groupImg: 'https://picsum.photos/200/300',
    groupName: 'Money Palava Savers',
    groupDesc:
      'Make we save together, chop better life! Join this group if you want to flex and still save money for better days. We go show you as money fit run belle and still dey for account.',
    contribution: 500000,
    expectedWithdrawal: 3500000,
    savingFrequency: 'Monthly',
    Duration: 7,
    takenSlots: [1, 3, 4, 6],
    groupMembers: 9,
  },
  {
    groupStatus: 'Waiting',
    groupImg: 'https://picsum.photos/200/300',
    groupName: 'Money Palava Savers',
    groupDesc:
      'Make we save together, chop better life! Join this group if you want to flex and still save money for better days. We go show you as money fit run belle and still dey for account.',
    contribution: 500000,
    expectedWithdrawal: 3500000,
    savingFrequency: 'Monthly',
    Duration: 7,
    takenSlots: [1, 4],
    groupMembers: 4,
  },
  {
    groupStatus: 'Waiting',
    groupImg: 'https://picsum.photos/200/300',
    groupName: 'Sabi-Sabi Slay Queens',
    groupDesc:
      'Attention Slay Queens! Una wey sabi fashion and glam, join this group make we save money for the latest trends and slay effortlessly. No dulling, we go blend fashion and savings like jollof rice and chicken!',
    contribution: 500000,
    expectedWithdrawal: 3500000,
    savingFrequency: 'Daily',
    Duration: 8,
    takenSlots: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 28,
    ],
    groupMembers: 30,
  },
  {
    groupStatus: 'Waiting',
    groupImg: 'https://picsum.photos/200/300',
    groupName: 'Naija Travel Squad',
    groupDesc:
      'If you be proper ajala, join this group sharp sharp! We dey save money to explore Naija and beyond. From Lagos to Calabar, Abuja to Port Harcourt, we go waka waka together and scatter ground!',
    contribution: 500000,
    expectedWithdrawal: 4000000,
    savingFrequency: 'Monthly',
    Duration: 8,
    takenSlots: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 28,
    ],
    groupMembers: 30,
  },
]

const ExploreGroup = () => {
  return (
    <div className={styles.allContainer}>
      <div className={styles.allContainerOne}>
        <Text content="Active Savings Group" size="Label" />
        <span>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.292894 9.70711C-0.0976307 9.31658 -0.0976307 8.68342 0.292894 8.29289L3.58579 5L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292894C0.683417 -0.0976312 1.31658 -0.0976312 1.70711 0.292894L5.70711 4.29289C6.09763 4.68342 6.09763 5.31658 5.70711 5.70711L1.70711 9.70711C1.31658 10.0976 0.683418 10.0976 0.292894 9.70711Z"
              fill="#94A3B8"
            />
          </svg>
        </span>
        <Text content="Explore Groups" />
      </div>
      <div className={styles.allContainerTwo}>
        <Text content="Explore Groups" level={1} />
        <span>
          <svg
            width="71"
            height="25"
            viewBox="0 0 71 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 6.5H19M21 12.5H16M21 18.5H16M7 20.5V14.0612C7 13.8532 7 13.7492 6.97958 13.6497C6.96147 13.5615 6.93151 13.4761 6.89052 13.3958C6.84431 13.3054 6.77934 13.2242 6.64939 13.0617L3.35061 8.93826C3.22066 8.77583 3.15569 8.69461 3.10948 8.60417C3.06849 8.52393 3.03853 8.43852 3.02042 8.35026C3 8.25078 3 8.14677 3 7.93875V6.1C3 5.53995 3 5.25992 3.10899 5.04601C3.20487 4.85785 3.35785 4.70487 3.54601 4.60899C3.75992 4.5 4.03995 4.5 4.6 4.5H13.4C13.9601 4.5 14.2401 4.5 14.454 4.60899C14.6422 4.70487 14.7951 4.85785 14.891 5.04601C15 5.25992 15 5.53995 15 6.1V7.93875C15 8.14677 15 8.25078 14.9796 8.35026C14.9615 8.43852 14.9315 8.52393 14.8905 8.60417C14.8443 8.69461 14.7793 8.77583 14.6494 8.93826L11.3506 13.0617C11.2207 13.2242 11.1557 13.3054 11.1095 13.3958C11.0685 13.4761 11.0385 13.5615 11.0204 13.6497C11 13.7492 11 13.8532 11 14.0612V17.5L7 20.5Z"
              stroke="#98A2B3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33.5497 19.5V7.86364H40.527V9.11364H34.9588V13.0455H40.0043V14.2955H34.9588V19.5H33.5497ZM42.9085 19.5V10.7727H44.2494V19.5H42.9085ZM43.5903 9.31818C43.329 9.31818 43.1036 9.22917 42.9142 9.05114C42.7286 8.87311 42.6358 8.65909 42.6358 8.40909C42.6358 8.15909 42.7286 7.94508 42.9142 7.76705C43.1036 7.58902 43.329 7.5 43.5903 7.5C43.8517 7.5 44.0752 7.58902 44.2608 7.76705C44.4502 7.94508 44.5449 8.15909 44.5449 8.40909C44.5449 8.65909 44.4502 8.87311 44.2608 9.05114C44.0752 9.22917 43.8517 9.31818 43.5903 9.31818ZM48.1963 7.86364V19.5H46.8554V7.86364H48.1963ZM54.5977 10.7727V11.9091H50.075V10.7727H54.5977ZM51.3932 8.68182H52.7341V17C52.7341 17.3788 52.789 17.6629 52.8989 17.8523C53.0125 18.0379 53.1564 18.1629 53.3307 18.2273C53.5087 18.2879 53.6962 18.3182 53.8932 18.3182C54.0409 18.3182 54.1621 18.3106 54.2568 18.2955C54.3515 18.2765 54.4273 18.2614 54.4841 18.25L54.7568 19.4545C54.6659 19.4886 54.539 19.5227 54.3761 19.5568C54.2133 19.5947 54.0068 19.6136 53.7568 19.6136C53.378 19.6136 53.0068 19.5322 52.6432 19.3693C52.2833 19.2064 51.9841 18.9583 51.7455 18.625C51.5106 18.2917 51.3932 17.8712 51.3932 17.3636V8.68182ZM60.3301 19.6818C59.4892 19.6818 58.7638 19.4962 58.154 19.125C57.5479 18.75 57.0801 18.2273 56.7506 17.5568C56.4248 16.8826 56.2619 16.0985 56.2619 15.2045C56.2619 14.3106 56.4248 13.5227 56.7506 12.8409C57.0801 12.1553 57.5384 11.6212 58.1256 11.2386C58.7165 10.8523 59.4059 10.6591 60.1938 10.6591C60.6483 10.6591 61.0972 10.7348 61.5403 10.8864C61.9835 11.0379 62.3869 11.2841 62.7506 11.625C63.1142 11.9621 63.404 12.4091 63.6199 12.9659C63.8358 13.5227 63.9438 14.2083 63.9438 15.0227V15.5909H57.2165V14.4318H62.5801C62.5801 13.9394 62.4816 13.5 62.2847 13.1136C62.0915 12.7273 61.815 12.4223 61.4551 12.1989C61.0991 11.9754 60.6786 11.8636 60.1938 11.8636C59.6597 11.8636 59.1975 11.9962 58.8074 12.2614C58.421 12.5227 58.1237 12.8636 57.9153 13.2841C57.707 13.7045 57.6028 14.1553 57.6028 14.6364V15.4091C57.6028 16.0682 57.7165 16.6269 57.9438 17.0852C58.1748 17.5398 58.4949 17.8864 58.904 18.125C59.3131 18.3598 59.7884 18.4773 60.3301 18.4773C60.6824 18.4773 61.0006 18.428 61.2847 18.3295C61.5725 18.2273 61.8206 18.0758 62.029 17.875C62.2373 17.6705 62.3983 17.4167 62.5119 17.1136L63.8074 17.4773C63.671 17.9167 63.4419 18.303 63.1199 18.6364C62.7979 18.9659 62.4002 19.2235 61.9267 19.4091C61.4532 19.5909 60.921 19.6818 60.3301 19.6818ZM66.1335 19.5V10.7727H67.429V12.0909H67.5199C67.679 11.6591 67.9669 11.3087 68.3835 11.0398C68.8002 10.7708 69.2699 10.6364 69.7926 10.6364C69.8911 10.6364 70.0142 10.6383 70.1619 10.642C70.3097 10.6458 70.4214 10.6515 70.4972 10.6591V12.0227C70.4517 12.0114 70.3475 11.9943 70.1847 11.9716C70.0256 11.9451 69.857 11.9318 69.679 11.9318C69.2547 11.9318 68.8759 12.0208 68.5426 12.1989C68.2131 12.3731 67.9517 12.6155 67.7585 12.9261C67.5691 13.233 67.4744 13.5833 67.4744 13.9773V19.5H66.1335Z"
              fill="#98A2B3"
            />
          </svg>
        </span>
      </div>
      {/* <section> */}
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
              <div className={styles.layoutright}>
                <div className={styles.layoutboxtop}>
                  <span>
                    <Text
                      className={styles.layoutGroupStatus}
                      content={group.groupStatus}
                    />
                  </span>
                  <div className={styles.layoutMembersImg}>
                    <img
                      src="https://picsum.photos/200/300"
                      alt="group member Image"
                    />
                    <img
                      src="https://picsum.photos/200/300"
                      alt="group member Image"
                    />
                    <img
                      src="https://picsum.photos/200/300"
                      alt="group member Image"
                    />
                    <img
                      src="https://picsum.photos/200/300"
                      alt="group member Image"
                    />
                    <p
                      style={{
                        display: group.groupMembers > 4 ? 'grid' : 'none',
                      }}
                    >
                      +
                      {group.groupMembers > 4
                        ? group.groupMembers - 4
                        : group.groupMembers}
                    </p>
                  </div>
                  <Button text="Join" />
                  <svg
                    width="5"
                    height="17"
                    viewBox="0 0 5 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.3999 8.58008H2.4099M2.3999 2.58008H2.4099M2.3999 14.5801H2.4099M3.3999 8.58008C3.3999 9.13236 2.95219 9.58008 2.3999 9.58008C1.84762 9.58008 1.3999 9.13236 1.3999 8.58008C1.3999 8.02779 1.84762 7.58008 2.3999 7.58008C2.95219 7.58008 3.3999 8.02779 3.3999 8.58008ZM3.3999 14.5801C3.3999 15.1324 2.95219 15.5801 2.3999 15.5801C1.84762 15.5801 1.3999 15.1324 1.3999 14.5801C1.3999 14.0278 1.84762 13.5801 2.3999 13.5801C2.95219 13.5801 3.3999 14.0278 3.3999 14.5801ZM3.3999 2.58008C3.3999 3.13236 2.95219 3.58008 2.3999 3.58008C1.84762 3.58008 1.3999 3.13236 1.3999 2.58008C1.3999 2.02779 1.84762 1.58008 2.3999 1.58008C2.95219 1.58008 3.3999 2.02779 3.3999 2.58008Z"
                      stroke="#131A29"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Text content={group.groupName} level={3} />
                <Text size="Small" content={group.groupDesc} />
                <div className={styles.layouttableContainer}>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <Text
                            content={'Contribution'}
                            size={'Small'}
                            className={styles.layoutBoxHead}
                          />
                        </th>
                        <th>
                          <Text
                            content={'Exp. Withdrawal'}
                            size={'Small'}
                            className={styles.layoutBoxHead}
                          />
                        </th>
                        <th>
                          <Text
                            content={'Saving Freq'}
                            size={'Small'}
                            className={styles.layoutBoxHead}
                          />
                        </th>
                        <th>
                          <Text
                            content={'Duration'}
                            size={'Small'}
                            className={styles.layoutBoxHead}
                          />
                        </th>
                        <th>
                          <Text
                            content={'Available Slot'}
                            size={'Small'}
                            className={styles.layoutBoxHead}
                          />
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <Text
                            content={group.contribution.toString()}
                            size="Small"
                          />
                        </td>
                        <td>
                          <Text
                            content={group.expectedWithdrawal.toString()}
                            size="Small"
                          />
                        </td>
                        <td>
                          <Text content={group.savingFrequency} size="Small" />
                        </td>
                        <td>
                          <Text
                            content={
                              group.Duration.toString() +
                              (group.savingFrequency == 'Daily'
                                ? ' days'
                                : ' mos')
                            }
                            size="Small"
                          />
                        </td>
                        <td>
                          <Text
                            content={findMissingNumbers(
                              group.groupMembers,
                              group.takenSlots
                            ).toString()}
                            size="Small"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Text
                  className={styles.layoutrightBottom}
                  content="View Group"
                  size="Small"
                />
              </div>
            </Card>
          </section>
        )
      })}
      {/* </section> */}
    </div>
  )
}

export default ExploreGroup
