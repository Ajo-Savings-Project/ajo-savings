import { appNotify } from 'components'
import { MAX_FILE_SIZE_MB } from 'components/compounds/KYCSetup/constant'

export const handleFileInputChange = (
  inputFiles: FileList | null,
  setPreview: React.Dispatch<React.SetStateAction<string | null>>,
  setFileName: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (inputFiles && inputFiles.length > 0) {
    const file = inputFiles[0]
    if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)

      //Extract file name
      const fileName = file.name
      setFileName(fileName)
    } else {
      appNotify('error', 'File size exceeds the maximum allowed size (50MB).')
    }
  }
}
