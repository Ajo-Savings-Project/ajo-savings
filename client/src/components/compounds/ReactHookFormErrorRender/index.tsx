import { DeepMap, FieldValues } from 'react-hook-form'
import { stringToSentenceCase } from 'utils/stringManip.ts'
import { Text } from 'components'
import styles from './errors.module.scss'

interface FieldError {
  type: string
  message: string
}
interface ReactHookFormErrorRenderProps {
  errors: DeepMap<FieldValues, FieldError>
}

const ReactHookFormErrorRender = ({
  errors,
}: ReactHookFormErrorRenderProps) => {
  return Object.keys(errors).length ? (
    <div className={styles.errorContainer}>
      {Object.entries(errors).map(([k, v]) => (
        <Text key={k} size={'Small'} color={'none'}>
          <strong>{stringToSentenceCase(k)} Field: </strong>
          {v?.message}
        </Text>
      ))}
    </div>
  ) : null
}

export default ReactHookFormErrorRender
