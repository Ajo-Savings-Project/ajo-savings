import React, { useState } from 'react'
import {
  Text,
  Input,
  Button,
  Card,
  ReactHookFormErrorRender,
  InfoCard,
  Modal,
  Select,
} from 'components'
import styles from './setTarget.module.scss'
import CloseIcon from '../Modal/images/Close.svg?react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SetTargetSchema } from './request'
import { zodResolver } from '@hookform/resolvers/zod'
interface SetTargetProps {
  onClose?: () => void
}
const initialFormValues = {
  target: '',
  targetAmount: 0,
  frequency: 'Pick your frequency',
  startDate: '',
  withdrawalDate: '',
}
type SetTargetSchemaType = z.infer<typeof SetTargetSchema>

const SetTarget: React.FC<SetTargetProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SetTargetSchemaType>({
    resolver: zodResolver(SetTargetSchema),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSetTargetRegister = async (values: SetTargetSchemaType) => {
    console.log('SetTarget form values:', values)
    if (Object.keys(errors).length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsModalOpen(true)
      setTimeout(() => {
        reset(initialFormValues)
      }, 100)
    }
  }
  return (
    <div>
      {isModalOpen && (
        <Modal
          initialState={true}
          renderModalContent={({ onClose }) => (
            <InfoCard
              onClick={() => {
                onClose()
              }}
              text="Success!"
              Subtext="You've updated your Saving Goals List. Good Luck in achieving your target!"
            />
          )}
        />
      )}
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
          <form onSubmit={handleSubmit(handleSetTargetRegister)}>
            <Input
              label={'Target'}
              placeholder={'Type here'}
              type={'text'}
              {...register('target')}
            />
            <Input
              label={'Target Amount'}
              placeholder={'Numbers only'}
              type="number"
              {...register('targetAmount', { valueAsNumber: true })}
              defaultValue={'Numbers only'}
            />
            <div className={styles.setTargetContainerInputFrequency}>
              <Select
                label={'Frequency'}
                options={[
                  {
                    label: 'Pick your frequency',
                    value: 'Pick your frequency',
                  },
                  { label: 'Daily', value: 'Daily' },
                  { label: 'Weekly', value: 'Weekly' },
                  { label: 'Monthly', value: 'Monthly' },
                ]}
                {...register('frequency')}
              />
            </div>
            <Input
              label={'Start Date'}
              type="date"
              {...register('startDate')}
            />
            <Input
              label={'Withdrawal Date'}
              placeholder={'Pick your date'}
              type={'date'}
              {...register('withdrawalDate')}
            />
            <Button type="submit">Submit</Button>
          </form>
          <ReactHookFormErrorRender errors={errors} />
        </div>
      </Card>
    </div>
  )
}
export default SetTarget
