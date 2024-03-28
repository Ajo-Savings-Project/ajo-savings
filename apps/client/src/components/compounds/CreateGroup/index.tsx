import styles from './createGroup.module.scss'
import {
  Text,
  DropBoxInput,
  Input,
  Select,
  Button,
  Textarea,
  ModalCard,
  ReactHookFormErrorRender,
  Modal,
} from 'components'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateGroupSchema, useCreateGroupMutation } from './request'
import CreateGroupCard from './CreateGroupCard/CreateGroupCard'

interface CreateGroupProps {
  onClose: () => void
}
const initialFormValues = {
  groupName: '',
  contributionAmount: '',
  duration: '',
  numberOfParticipants: '',
  purposeAndGoals: '',
}

type CreateGroupSchemaType = z.infer<typeof CreateGroupSchema>

const CreateGroup: React.FC<CreateGroupProps> = ({
  onClose: parentModalOnClose,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupSchemaType>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: initialFormValues,
  })

  const apiCreateGroup = useCreateGroupMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateGroupRegister = async (values: CreateGroupSchemaType) => {
    await apiCreateGroup.mutateAsync(values)
    console.log('CreateGroup form form values:', values)

    setIsModalOpen(true)
  }

  const handleDocsUpload =
    (types: string) => (resp: { files: FileList | null; preview: string }) => {
      console.log('Types', types, 'resp', resp)
    }
  return (
    <>
      <Modal
        initialState={isModalOpen}
        renderModalContent={({ onClose }) => (
          <CreateGroupCard
            onClick={() => {
              onClose()
            }}
            text="Success!"
            Subtext="Your new savings group was successfully created. As participants join, you will be notified, and the savings will start as soon as all available slots are filled."
          />
        )}
      />
      <ModalCard className={styles.container} onClick={parentModalOnClose}>
        <Text
          size={'Label'}
          content="Create New Savings Group"
          className={styles.containerText}
        />
        <div className={styles.containerImage}>
          <DropBoxInput
            subText="Drop your images here"
            summary="Drop a picture that represents the title of your savings group here"
            onGetFile={handleDocsUpload('')}
          />
        </div>
        <div className={styles.containerForm}>
          <form onSubmit={handleSubmit(handleCreateGroupRegister)}>
            <Input
              label={'Group name'}
              placeholder="Enter the name of the group"
              {...register('groupName')}
            />
            <Controller
              render={({ field }) => (
                <Input
                  label={'Contribution Amount'}
                  placeholder={'Numbers only'}
                  numberOnly
                  {...field}
                />
              )}
              control={control}
              name="recurringAmount"
            />
            <div className={styles.containerFormDuration}>
              <Select
                label={'Frequency'}
                placeholder="Select your frequency"
                options={[
                  { label: 'Daily', value: 'DAILY' },
                  { label: 'Weekly', value: 'WEEKLY' },
                  { label: 'Monthly', value: 'MONTHLY' },
                ]}
                {...register('frequency')}
              />
              <Controller
                render={({ field }) => (
                  <Input
                    label={'Number of participants'}
                    placeholder={'Numbers only'}
                    numberOnly
                    {...field}
                  />
                )}
                control={control}
                name="maxNumberOfParticipants"
              />{' '}
            </div>
            <Textarea
              label={'Purpose and Goals'}
              placeholder="Notes to encourage users to join your saving group"
              {...register('purposeAndGoals')}
            />
            <Button
              text="Create New Group"
              kind="rounded"
              className={styles.containerFormBtn}
              type="submit"
              isLoading={apiCreateGroup.isLoading}
            />
          </form>
          <ReactHookFormErrorRender errors={errors} />
        </div>
      </ModalCard>
    </>
  )
}

export default CreateGroup
