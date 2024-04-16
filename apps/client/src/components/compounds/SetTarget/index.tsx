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
import styles from './setTarget.module.scss'
import { SetTargetSchema, useCreateTargetMutation } from './request'

interface SetTargetProps {
  onClose: () => void
}
const defaultCategories = [
  'TRAVEL',
  'DREAM_HOME',
  'DREAM_CAR',
  'RENT',
  'GADGETS',
  'OTHER',
]

const initialFormValues = {
  target: '',
  targetAmount: '',
  frequency: '',
  startDate: '',
  withdrawalDate: '',
  category: '',
}
type SetTargetSchemaType = z.infer<typeof SetTargetSchema>

const SetTarget: React.FC<SetTargetProps> = ({
  onClose: parentModalOnClose,
}) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SetTargetSchemaType>({
    resolver: zodResolver(SetTargetSchema),
    defaultValues: initialFormValues,
  })

  const apiSetTarget = useCreateTargetMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoryInput, setCategoryInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value
    setCategoryInput(userInput)
    if (!userInput.trim()) {
      setSuggestions([])
    } else {
      const filteredSuggestions = defaultCategories.filter((category) =>
        category.toLowerCase().includes(userInput.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
    }
  }
  const handleSetTargetRegister = async (values: SetTargetSchemaType) => {
    setValue('category', categoryInput, { shouldValidate: true })

    await apiSetTarget.mutateAsync({ ...values })
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
              {...register('name')}
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
            <Select
              className={styles.setTargetContainerInputFrequency}
              label={'Frequency'}
              placeholder={'Pick your frequency'}
              options={[
                { label: 'Daily', value: 'DAILY' },
                { label: 'Weekly', value: 'WEEKLY' },
                { label: 'Monthly', value: 'MONTHLY' },
                { label: 'Annually', value: 'ANNUALLY' },
              ]}
              {...register('frequency')}
            />
            <div className={styles.setTargetContainerInputCategory}>
              <Input
                label={'Category'}
                placeholder="Category"
                type="search"
                onChange={handleCategoryChange}
                value={categoryInput}
                autoComplete="off"
              />
              {categoryInput && suggestions.length > 0 && (
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setCategoryInput(suggestion)
                        setValue('category', suggestion, {
                          shouldValidate: true,
                        })
                        setSuggestions([])
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Input
              label={'Start Date'}
              type="date"
              {...register('startDate')}
            />
            <Input
              label={'Withdrawal Date'}
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
