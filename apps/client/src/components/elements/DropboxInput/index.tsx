import {
  ChangeEvent,
  DragEvent,
  InputHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from 'react'
import { appNotify, Text } from 'components'
import styles from './styles.module.scss'
interface DropboxI
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  icon?: string | ReactNode
  subtext?: string
  summary?: string
  maxFileSizeInMb?: number
  onGetFile?: (fileProps: { files: FileList | null; preview: string }) => void
}

export const DEFAULT_FILE_MAX_SIZE_IN_MB = 50

const BrowseButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick} className={styles.dropboxBrowser}>
    browse
  </button>
)
const DropboxInput = ({
  icon: Icon,
  subtext,
  summary,
  maxFileSizeInMb,
  onGetFile,
  ...rest
}: DropboxI) => {
  const [files, setFiles] = useState<FileList | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const maxFileSize = maxFileSizeInMb || DEFAULT_FILE_MAX_SIZE_IN_MB

  const handleFileChange = (_files: FileList) => {
    if (_files && _files.length > 0) {
      if (_files[0].size <= maxFileSize * 1024 * 1024) {
        setFiles(_files)
        const reader = new FileReader()
        reader.readAsDataURL(_files[0])
        reader.onload = () => {
          if (onGetFile) {
            onGetFile({ files: _files, preview: reader.result as string })
          }
        }
      } else {
        appNotify(
          'error',
          `File size exceeds the maximum allowed size (${maxFileSize}).`
        )
      }
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _files = e.target.files
    if (_files) handleFileChange(_files)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    const _files = e.dataTransfer.files
    if (_files) handleFileChange(_files)
  }

  const handleOnClickBrowse = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleRemoveSelection = () => {
    if (inputRef.current) {
      setFiles(null)
      if (onGetFile) {
        onGetFile({ files: null, preview: '' })
      }
    }
  }

  return (
    <div
      className={styles.dropbox}
      role="presentation"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div>
        {Icon ? (
          typeof Icon === 'string' ? (
            <img src={Icon} alt="drag and drop icon" />
          ) : (
            Icon
          )
        ) : null}
      </div>
      {!files ? (
        <>
          <Text size="Small" className={styles.IdDocsText}>
            {subtext ? (
              <>
                {subtext} or <BrowseButton onClick={handleOnClickBrowse} />
              </>
            ) : (
              <BrowseButton onClick={handleOnClickBrowse} />
            )}
          </Text>

          <Text size="Small" className={styles.IdDocsText} content={summary} />
        </>
      ) : (
        <>
          {files[0].name}
          <button type={'button'} onClick={handleRemoveSelection}>
            x
          </button>
        </>
      )}

      <input
        ref={inputRef}
        {...rest}
        type="file"
        onChange={handleChange}
        hidden
      />
    </div>
  )
}

export default DropboxInput
