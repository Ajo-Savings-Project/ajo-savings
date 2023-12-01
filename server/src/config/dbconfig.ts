import merge from 'lodash.merge'
import dotenv from 'dotenv'
import prod from './prod'
import dev from './dev'
dotenv.config()

const stage: string = process.env.NODE_ENV!
let config

if (stage === 'production') {
  config = prod
} else if (stage === 'development') {
  config = dev
} else {
  config = null
}

export default merge(
  {
    stage,
  },
  config
)
