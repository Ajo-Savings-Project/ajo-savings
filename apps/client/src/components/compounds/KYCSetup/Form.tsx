import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Input,
  ReactHookFormErrorRender,
  Select,
  Text,
  DropboxInput,
} from 'components'
import { useAuth } from 'contexts'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Close from '../KYCSetup/close.svg?react'
import styles from './kyc.module.scss'

interface Close {
  onClose: () => void
}
type FormData = z.infer<typeof Schema>

const Schema = z.object({
  gender: z.string(),
  occupation: z.string(),
  dob: z.string(),
  idType: z.string(),
  bvn: z.string(),
  address: z.string(),
  idNumber: z.string(),
})

const Form = ({ onClose }: Close) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  })

  const { handleStateUpdate } = useAuth()

  const makeApiCallSubmit = () => {
    handleStateUpdate({ kycComplete: true })
  }

  const handleDocUpload =
    (type: string) => (resp: { files: FileList | null; preview: string }) => {
      console.log('TYPE', type, 'RESP', resp)
    }

  return (
    <div className={styles.container}>
      <div className={styles.closeBtn}>
        <button type="button" className={`${styles.Btn} }`} onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className={styles.containerHeaderText}>
        <Text
          size="Subheading"
          content="Complete Your KYC Verification"
          className={styles.containerHeaderTextBig}
        />
        <Text
          size="Small"
          className={styles.containerHeaderTextSmall}
          font="Inter"
        >
          <span>
            Please complete the KYC verification process to unlock the full
            features and benefits of{' '}
            <span style={{ color: 'var(--primary-600)' }}>Savi</span>
          </span>
        </Text>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(makeApiCallSubmit)}>
        <div className={styles.flexDiv}>
          <Select
            id="gender"
            label={' Gender'}
            options={[
              { label: 'Select your gender', value: '0' },
              { label: 'Male', value: '1' },
              { label: 'Female', value: '2' },
            ]}
            className={styles.flex}
            {...register('gender')}
          />

          <Select
            id="occupation"
            label={'Occupation'}
            options={[
              { label: 'Select your Occupation', value: '1' },
              { label: 'label', value: '2' },
            ]}
            className={styles.occupation}
            {...register('occupation')}
          />
        </div>
        <div className={styles.flexDiv}>
          <Input
            label={'Date of Birth'}
            type="date"
            className={styles.Dob}
            {...register('dob')}
          />
          <Select
            id="idType"
            label={'Identification Type'}
            options={[
              { label: 'Select your type', value: '1' },
              { label: 'label', value: '2' },
            ]}
            className={styles.Identity}
            {...register('idType')}
          />
        </div>

        <Input
          id="bvn"
          label={'BVN'}
          placeholder="Input your BVN"
          className={styles.Bvn}
          {...register('bvn')}
        />
        <Input
          id="address"
          type="text"
          label={'Address'}
          placeholder="Input your Address"
          className={styles.Address}
          {...register('address')}
        />

        <Input
          id="idNumber"
          label={'Identification Number'}
          type="text"
          placeholder="Input your Identification Num"
          className={styles.Idnumber}
          {...register('idNumber')}
        />
        <div>
          <Text size="Default" className={styles.label}>
            Upload Identification Document
          </Text>
          <DropboxInput
            subtext={'Drop your files here or'}
            summary={'Maximum size: 50MB'}
            onGetFile={handleDocUpload('identification-doc')}
          />
        </div>
        <div>
          <Text size="Default" className={styles.label}>
            Upload Proof of Address
          </Text>

          <DropboxInput
            subtext={'Drop your files here or'}
            summary={'Maximum size: 50MB'}
            onGetFile={handleDocUpload('proof-address')}
          />
        </div>

        <Button
          style={{ width: '100%', marginTop: '24px' }}
          text="Submit"
          type={'submit'}
        />
      </form>
      <ReactHookFormErrorRender errors={errors} />
    </div>
  )
}

export default Form
