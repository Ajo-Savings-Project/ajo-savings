import { HEADER_TITLE } from 'appConstants'
import { stringToSentenceCase } from 'utils/stringManip.ts'

export const getHeaderTitle = (path: string) => {
  if (path) {
    const paths = path.split('/')
    const pageTitle = paths[paths.length - 1]

    return `${stringToSentenceCase(pageTitle)} | ${HEADER_TITLE}`
  }
  return HEADER_TITLE
}
