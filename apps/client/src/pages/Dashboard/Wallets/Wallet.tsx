import { Button, Card, Text } from 'components'
import styles from './wallet.module.scss'
import AcctBal from './assets/account_balance_wallet.svg?react'
import Plus from './assets/Add+sign.svg?react'
import SendIcon from './assets/Sendsend.svg?react'
import Group from './assets/group.svg?react'
import Profile from './assets/profile.svg?react'
import Eye from './assets/hide.svg?react'
import { Modal, Input } from 'components'
import WalletCard from '../../../components/compounds/WalletCard/WalletCard'

function Wallet() {
  return (
    <div>
      <div className={styles.layout}>
        <div className={styles.card}>
          <Card
            className={styles.accountBal}
            style={{
              backgroundColor: 'var(--primary-500)',
              borderRadius: '1rem',
              padding: '1rem',
            }}
          >
            <AcctBal />
            <Text
              content={'Global Wallet'}
              size={'Small'}
              style={{ color: 'var(--white)', marginTop: '0.5rem' }}
            />

            <Text
              content={'₦ 5,005,000.00'}
              size={'Subtext'}
              style={{
                color: 'var(--white)',
                marginTop: '0.25rem',
              }}
            />

            <div className={styles.buttonDiv}>
              <Modal
                renderOnOpen={({ onOpen }) => (
                  <Button
                    className={styles.button}
                    kind={'rounded'}
                    onClick={onOpen}
                  >
                    <Plus className={styles.plus} />
                    <Text
                      content={'Deposit'}
                      size={'Small'}
                      style={{
                        color: 'var(--white)',
                      }}
                    />
                  </Button>
                )}
                renderModalContent={({ onClose }) => (
                  <WalletCard className={styles.infoCard} onClick={onClose}>
                    <Text
                      content={'Add to your savings'}
                      size={'Subtext'}
                      style={{ textAlign: 'center' }}
                    />

                    <form className={styles.cardForm}>
                      <Input
                        className={styles.infoCardDivInput}
                        type={'text'}
                        label={'Amount to Deposit'}
                        placeholder={'Type the amount'}
                      />

                      <Button
                        style={{ marginTop: '2rem', width: '100%' }}
                        type={'submit'}
                      >
                        Submit
                      </Button>
                    </form>
                  </WalletCard>
                )}
              />

              <Modal
                renderOnOpen={({ onOpen }) => (
                  <Button
                    className={styles.button}
                    kind={'rounded'}
                    onClick={onOpen}
                    style={{
                      backgroundColor: 'var(--primary-500)',
                      border: '1px solid white',
                    }}
                  >
                    <SendIcon />
                    <Text
                      content={'Withdraw'}
                      size={'Small'}
                      style={{
                        color: 'var(--white)',
                      }}
                    />
                  </Button>
                )}
                renderModalContent={({ onClose }) => (
                  <WalletCard className={styles.infoCard} onClick={onClose}>
                    <Text
                      content={'Access Your Wallet'}
                      size={'Subtext'}
                      style={{ textAlign: 'center' }}
                    />

                    <form className={styles.cardForm}>
                      <Input
                        className={styles.infoCardDivInput}
                        type={'text'}
                        label={'Amount to Withdraw'}
                        placeholder={'Type the amount'}
                      />

                      <Button
                        style={{ marginTop: '2rem', width: '100%' }}
                        type={'submit'}
                      >
                        Submit
                      </Button>
                    </form>
                  </WalletCard>
                )}
              />
            </div>
          </Card>

          <Card
            className={styles.group}
            style={{
              backgroundColor: 'var(--white)',
              borderRadius: '1rem',
              padding: '1rem',
            }}
          >
            <Group />
            <Text
              content={'Total Group Savings '}
              size={'Small'}
              style={{
                color: 'var(--gray-900)',
                marginTop: '0.5rem',
                fontWeight: '400',
              }}
            />

            <Text
              content={'₦ 500,000.00'}
              size={'Small'}
              style={{
                color: 'var(--gray-900)',
                marginTop: '0.25rem',
                fontSize: '1.25rem',
                fontWeight: '600',
              }}
            />

            <Modal
              renderOnOpen={({ onOpen }) => (
                <Button className={styles.groupButton} kind={'rounded'}>
                  <Plus className={styles.plus} />
                  <Text
                    content={'Add money'}
                    style={{
                      color: 'var(--white)',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                    onClick={onOpen}
                  />
                </Button>
              )}
              renderModalContent={({ onClose }) => (
                <WalletCard className={styles.infoCard} onClick={onClose}>
                  <Text
                    content={'Access your Wallet'}
                    size={'Subtext'}
                    style={{ textAlign: 'center' }}
                  />

                  <form className={styles.cardForm}>
                    <Input
                      className={styles.infoCardDivInput}
                      type={'text'}
                      label={'Amount'}
                      placeholder={'Type the amount'}
                    />

                    <Button
                      style={{ marginTop: '2rem', width: '100%' }}
                      type={'submit'}
                    >
                      Submit
                    </Button>
                  </form>
                </WalletCard>
              )}
            />
          </Card>
          <Card
            className={styles.group}
            style={{
              backgroundColor: 'var(--white)',
              borderRadius: '1rem',
              padding: '1rem',
            }}
          >
            <Profile />
            <Text
              content={'Total Personal Savings '}
              size={'Small'}
              style={{
                color: 'var(--gray-900)',
                marginTop: '0.5rem',
                fontWeight: '400',
              }}
            />

            <Text
              content={'₦ 105,345.00'}
              size={'Small'}
              style={{
                color: 'var(--gray-900)',
                marginTop: '0.25rem',
                fontSize: '1.25rem',
                fontWeight: '600',
              }}
            />
            <div>
              <Modal
                renderOnOpen={({ onOpen }) => (
                  <Button
                    className={styles.groupButton}
                    kind={'rounded'}
                    onClick={onOpen}
                  >
                    <Plus className={styles.plus} />
                    <Text
                      content={'Add money'}
                      style={{
                        color: 'var(--white)',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                    />
                  </Button>
                )}
                renderModalContent={({ onClose }) => (
                  <WalletCard className={styles.infoCard} onClick={onClose}>
                    <Text
                      content={'Access Your Wallet'}
                      size={'Subtext'}
                      style={{ textAlign: 'center' }}
                    />

                    <form className={styles.cardForm}>
                      <Input
                        className={styles.infoCardDivInput}
                        type={'text'}
                        label={'Amount'}
                        placeholder={'Type the amount'}
                      />

                      <Button
                        style={{ marginTop: '2rem', width: '100%' }}
                        type={'submit'}
                      >
                        Submit
                      </Button>
                    </form>
                  </WalletCard>
                )}
              />
            </div>
          </Card>
          <Card
            className={styles.group}
            style={{
              backgroundColor: 'var(--white)',
              borderRadius: '1rem',
              padding: '1rem',
            }}
          >
            <Eye />
            <Text
              content={'Safe Lock '}
              size={'Small'}
              style={{
                color: 'var(--gray-900)',
                marginTop: '0.5rem',
                fontWeight: '400',
              }}
            />

            <Text
              content={'₦ ****'}
              size={'Small'}
              style={{
                color: 'var(--gray-900)',
                marginTop: '0.25rem',
                fontSize: '1.25rem',
                fontWeight: '600',
              }}
            />
            <Modal
              renderOnOpen={({ onOpen }) => (
                <Button
                  className={styles.groupButton}
                  kind={'rounded'}
                  onClick={onOpen}
                >
                  <Plus className={styles.plus} />
                  <Text
                    content={'Add money'}
                    style={{
                      color: 'var(--white)',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  />
                </Button>
              )}
              renderModalContent={({ onClose }) => (
                <WalletCard className={styles.infoCard} onClick={onClose}>
                  <Text
                    content={'Access Your Wallet'}
                    size={'Subtext'}
                    style={{ textAlign: 'center' }}
                  />

                  <form className={styles.cardForm}>
                    <Input
                      className={styles.infoCardDivInput}
                      type={'text'}
                      label={'Amount'}
                      placeholder={'Type the amount'}
                    />

                    <Button
                      style={{ marginTop: '2rem', width: '100%' }}
                      type={'submit'}
                    >
                      Submit
                    </Button>
                  </form>
                </WalletCard>
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Wallet
