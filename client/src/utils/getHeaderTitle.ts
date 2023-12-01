import  HEADER_TITLE  from 'constants'
import { stringToSentenceCase } from 'utils/stringManip.ts'

export const getHeaderTitle = (path: string) => {
  if(path){
    const paths = path.split("/")
    const page = paths[paths.length - 1]
    // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
    return `${stringToSentenceCase(page)} | ${HEADER_TITLE}`
  }
  return HEADER_TITLE
}