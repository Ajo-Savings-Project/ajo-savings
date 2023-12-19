import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { CustomTooltip } from './CustomTootip'
import { Text } from 'components'
import styles from './chat.module.scss'

const payload = [
  {
    name: 'Jan',
    income: 4000,

    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    income: 3000,

    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    income: 2000,

    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    income: 2780,

    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    income: 1890,

    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    income: 2390,

    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    income: 890,

    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    income: 1290,

    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sept',
    income: 3090,

    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    income: 2450,

    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    income: 2090,

    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Dec',
    income: 1490,

    pv: 4300,
    amt: 2100,
  },
]

const Chart = () => {
  return (
    <div style={{ width: '80%', height: '100%' }}>
      <div className={styles.chartHeading}>
        <Text
          style={{ fontWeight: '400', textTransform: 'uppercase' }}
          size="Small"
          content={'Total Income'}
        />
        <button className={styles.chartHeadingBtn}>Last 12 Months</button>
      </div>

      <ResponsiveContainer width="100%" height="30%">
        <AreaChart
          width={200}
          height={400}
          data={payload}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="paint0_linear_1_4597"
              x1="293.3"
              y1="-62.7251"
              x2="293.3"
              y2="99.775"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#088AB2" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            fill="url(#paint0_linear_1_4597"
          />

          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
export default Chart
