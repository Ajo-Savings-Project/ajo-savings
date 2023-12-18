import { TooltipProps } from 'recharts'
import PropTypes, { InferProps } from 'prop-types'
import styles from './chat.module.scss'
import Indicator from './images/Legend Indicator.svg?react'
import Beak from './images/Bottom Beak.svg?react'
import { Text } from 'components'

interface DataPoint {
  value?: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomTooltipProps extends TooltipProps<any, any> {
  payload?: DataPoint[]
}
export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTip}>
        <div className={styles.customTipFlex}>
          <Indicator />
          <Text
            size="Small"
            className={styles.customTipLabel}
            content={`₦${payload[0].value}`}
          ></Text>
        </div>

        <Beak className={styles.customTipBeak} />
      </div>
    )
  }

  return null
}
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
    })
  ),
} as InferProps<typeof CustomTooltip.propTypes>
