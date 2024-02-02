import React, { useState } from 'react'
import { Text, Input, Button, Card } from 'components'
import styles from './setTarget.module.scss'
import CloseIcon from './ClosecloseIcon.svg?react'
import ArrowDown from './arrow_drop_downdownArrow.svg?react'

interface SetTargetProps {
  onClose?: () => void
}
const SetTarget: React.FC<SetTargetProps> = ({ onClose }) => {
  const [visible, setVisible] = useState(false)
  const [selectedFrequency, setSelectedFrequency] = useState('')

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible)
  }

  const handleFrequencySelection = (frequency: string) => {
    setSelectedFrequency(frequency)
    setVisible(false)
  }

  return (
    <div>
      <Card className={styles.setTargetContainer}>
        <div className={styles.setTargetContainerCloseIcon} onClick={onClose}>
          <CloseIcon />
        </div>
        <div className={styles.setTargetContainerText}>
          <Text content={'Set a Target'} size={'Subtext'} />
          <Text
            className={styles.setTargetContainerTextCreate}
            content={
              'Create and track multiple saving goals to achieve your financial targets'
            }
          />
        </div>
        <div className={styles.setTargetContainerInput}>
          <form>
            <Input label={'Target'} placeholder={'Type here'} type={'text'} />
            <Input label={'Target Amount'} placeholder={'Numbers only'} />
            <div className={styles.setTargetContainerInputFrequency}>
              <ArrowDown
                className={styles.setTargetContainerInputArrow}
                onClick={toggleVisibility}
              />
              <Input
                label={'Frequency'}
                placeholder={'Pick your frequency'}
                value={selectedFrequency}
                onClick={toggleVisibility}
              />
              {visible && (
                <div className={styles.setTargetContainerInputHidden}>
                  <Text
                    content="Daily"
                    onClick={() => handleFrequencySelection('Daily')}
                  />
                  <Text
                    content="Weekly"
                    onClick={() => handleFrequencySelection('Weekly')}
                  />
                  <Text
                    content="Monthly"
                    onClick={() => handleFrequencySelection('Monthly')}
                  />
                </div>
              )}
            </div>
            <Input label={'Start Date'} type={'date'} />
            <Input
              label={'Withdrawal Date'}
              placeholder={'Pick your date'}
              type={'date'}
            />
            <Button text="Submit" type="submit" />
          </form>
        </div>
      </Card>
    </div>
  )
}

export default SetTarget
