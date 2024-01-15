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
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '../../../pages/Auth/Login/requests.ts'
import Close from '../KYCSetup/close.svg?react'
import styles from './kyc.module.scss'

interface Close {
  onClose: () => void
}

const Form = ({ onClose }: Close) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  })

  const { handleStateUpdate } = useAuth()

  const genderRef = useRef<HTMLSelectElement>(null)
  const occupationRef = useRef<HTMLSelectElement>(null)
  const idTypeRef = useRef<HTMLSelectElement>(null)
  const bvnef = useRef<HTMLInputElement>(null)
  const idNumberRef = useRef<HTMLInputElement>(null)

  const makeApiCallSubmit = () => {
    handleStateUpdate({ kycComplete: true })
  }

  const handleDocUpload =
    (type: string) => (resp: { files: FileList | null; preview: string }) => {
      console.log(type, resp)
    }

  return (
    <div className={styles.container}>
      <div className={styles.closeBtn}>
        <button type="button" className={styles.Btn} onClick={onClose}>
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
            name="gender"
            ref={genderRef}
            label={' Gender'}
            options={[
              { label: 'Select your gender', value: '0' },
              { label: 'Male', value: '1' },
              { label: 'Female', value: '2' },
            ]}
            className={styles.flex}
          />
          <Select
            id="occupation"
            name="occupation"
            ref={occupationRef}
            label={'Occupation'}
            options={[
              { label: 'Select your Occupation', value: '1' },
              { label: 'label', value: '2' },
            ]}
            className={styles.occupation}
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
            name="idType"
            ref={idTypeRef}
            label={'Identification Type'}
            options={[
              { label: 'Select your type', value: '1' },
              { label: 'label', value: '2' },
            ]}
            className={styles.Identity}
          />
        </div>

        <Input
          id="bvn"
          name="bvn"
          ref={bvnef}
          label={'BVN'}
          placeholder="Input your BVN"
          className={styles.Bvn}
        />
        <Input
          type="text"
          label={'Address'}
          placeholder="Input your Address"
          className={styles.Address}
        />

        <Input
          id="idNumber"
          name="idNumber"
          ref={idNumberRef}
          label={'Identification Number'}
          type="text"
          placeholder="Input your Identification Num"
          className={styles.Idnumber}
        />
        <div>
          <Text>label</Text>
          <DropboxInput
            subtext={'subtext'}
            summary={'summary'}
            onGetFile={handleDocUpload('identification-doc')}
          />
        </div>
        <div>
          <Text>label</Text>
          <DropboxInput onGetFile={handleDocUpload('proof-address')} />
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
