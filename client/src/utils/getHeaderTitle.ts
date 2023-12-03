import  {HEADER_TITLE}  from 'constants/index'
import { stringToSentenceCase } from 'utils/stringManip.ts'

export const getHeaderTitle = (path: string) => {
  if (path) {
    const paths = path.split('/')
    const page = paths[paths.length - 1]
  
    return `${stringToSentenceCase(page)} | ${HEADER_TITLE}`
  }
  return HEADER_TITLE
}
