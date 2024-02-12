import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  InfoCard,
  Input,
  Modal,
  ReactHookFormErrorRender,
  Select,
  Text,
} from 'components'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import ModalCard from '../Modal/ModalCard'
import { SetTargetSchema } from './request'
import styles from './setTarget.module.scss'

interface SetTargetProps {
  onClose: () => void
}

const initialFormValues = {
  target: '',
  targetAmount: '',
  frequency: '',
  startDate: '',
  withdrawalDate: '',
}
type SetTargetSchemaType = z.infer<typeof SetTargetSchema>

const SetTarget: React.FC<SetTargetProps> = ({
  onClose: parentModalOnClose,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetTargetSchemaType>({
    resolver: zodResolver(SetTargetSchema),
    defaultValues: initialFormValues,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSetTargetRegister = async (values: SetTargetSchemaType) => {
    console.log('SetTarget form values:', values)
    if (Object.keys(errors).length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <Modal
        initialState={isModalOpen}
        renderModalContent={({ onClose }) => (
          <InfoCard
            onClick={() => {
              onClose()
              if (parentModalOnClose) {
                parentModalOnClose()
              }
            }}
            text="Success!"
            Subtext="You've updated your Saving Goals List. Good Luck in achieving your target!"
          />
        )}
      />
      <ModalCard
        className={styles.setTargetContainer}
        onClick={parentModalOnClose}
      >
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
            <Controller
              render={({ field }) => (
                <Input
                  label={'Target Amount'}
                  placeholder={'Numbers only'}
                  numberOnly
                  {...field}
                />
              )}
              control={control}
              name="targetAmount"
            />
            <div className={styles.setTargetContainerInputFrequency}>
              <Select
                label={'Frequency'}
                placeholder={'Pick your frequency'}
                options={[
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
      </ModalCard>
    </>
  )
}
export default SetTarget
