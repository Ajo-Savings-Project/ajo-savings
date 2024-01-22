import styles from './kyc.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactHookFormErrorRender, Text, Select, Input } from 'components'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useAuth } from 'contexts'
const Schema = z.object({
  gender: z.string(),
  occupation: z.string(),
  dob: z.string(),
  idType: z.string(),
  bvn: z.string(),
  address: z.string(),
  idNumber: z.string(),
})
type FormData = z.infer<typeof Schema>

const Form = ({ onClose }: { onClose: () => void }) => {
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
  console.log(onClose)
  return (
    <div className={styles.container}>
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
      </form>
      <ReactHookFormErrorRender errors={errors} />
    </div>
  )
}

export default Form
