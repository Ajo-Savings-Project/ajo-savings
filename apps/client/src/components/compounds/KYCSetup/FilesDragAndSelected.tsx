import { Text } from 'components'
import { useState, useRef } from 'react'
import { appNotify } from 'components'
import { handleFileInputChange } from 'utils/handleFileInputChange'
import DropboxInput from '../../elements/DropboxInput'
import { MAX_FILE_SIZE_MB } from './constant'
import styles from './kyc.module.scss'

const FilesDragAndSelected = () => {
  const [idDocsFiles, setIdDocsFiles] = useState<FileList | null>(null)
  const [proofOfAddressFiles, setProofOfAddressFiles] =
    useState<FileList | null>(null)

  const [idDocsPreview, setIdDocsPreview] = useState<string | null>(null)
  const [proofOfAddressPreview, setProofOfAddressPreview] = useState<
    string | null
  >(null)
  const [idDocsPreviewName, setIdDocsPreviewName] = useState<string | null>(
    null
  )
  const [proofOfAddressPreviewName, setProofOfAddressPreviewName] = useState<
    string | null
  >(null)
  const [selectedIdDocsFileName, setSelectedIdDocsFileName] = useState<
    string | null
  >(null)
  const [selectedProofOfAddressFileName, setSelectedProofOfAddressFileName] =
    useState<string | null>(null)

  const idDocsInputRef = useRef<HTMLInputElement>(null)
  const proofOfAddressInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
  }
  const handleDropIdDocs = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files

    if (files.length > 0 && files[0].size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
      setIdDocsFiles(files)
      const fileName = files[0].name
      setIdDocsPreviewName(fileName)
      const reader = new FileReader()
      reader.onload = () => setIdDocsPreview(reader.result as string)
      reader.readAsDataURL(files[0])
    } else {
      appNotify('error', 'File size exceeds the maximum allowed size (50MB).')
      setIdDocsFiles(idDocsFiles)
    }
  }

  const handleDropProofOfAdress = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()

    const files = e.dataTransfer.files

    if (files.length > 0 && files[0].size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
      setProofOfAddressFiles(files)
      const fileName = files[0].name
      setProofOfAddressPreviewName(fileName)
      const reader = new FileReader()
      reader.onload = () => setProofOfAddressPreview(reader.result as string)
      reader.readAsDataURL(files[0])
    } else {
      appNotify('error', 'File size exceeds the maximum allowed size (50MB).')
      setProofOfAddressFiles(proofOfAddressFiles)
    }
  }

  //Browsing through file... implementation
  const handleIdDocsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleFileInputChange(
      e.target.files,
      setIdDocsPreview,
      setSelectedIdDocsFileName
    )
  }
  const handleProofOfAddressInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    handleFileInputChange(
      e.target.files,
      setProofOfAddressPreview,
      setSelectedProofOfAddressFileName
    )
  }
  return (
    <>
      <DropboxInput
        onGetFile={(p) => {
          console.log(p)
        }}
      />
      <DropboxInput
        onGetFile={(p) => {
          console.log(p)
        }}
      />
      <div>
        <Text
          size="Default"
          style={{ fontWeight: '700', marginBottom: '10px' }}
        >
          Upload Identification Document
        </Text>
        {!idDocsFiles &&
        !idDocsPreview &&
        !idDocsPreviewName &&
        !selectedIdDocsFileName ? (
          <div
            className={styles.IdDocs}
            onDrop={handleDropIdDocs}
            onDragOver={handleDragOver}
          >
            <input
              id="idDocsInput"
              type="file"
              name="idDocsInput"
              ref={idDocsInputRef}
              onChange={(e) => handleIdDocsInputChange(e)}
              hidden
            />

            <Text size="Small" className={styles.IdDocsText}>
              <span>
                Drop your files here or{' '}
                <button
                  type="button"
                  onClick={() => idDocsInputRef.current!.click()}
                  style={{
                    color: 'var(--primary-600)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Browse
                </button>
              </span>{' '}
              <br />
              <p
                style={{
                  textAlign: 'center',
                  color: 'var(--gray-400)',
                  marginTop: '17.5px',
                }}
              >
                Maximum size: 50MB
              </p>
            </Text>
          </div>
        ) : (
          <div className={`${styles.idDocsImgText} ${styles.fadeIn}`}>
            <img
              src={idDocsPreview!}
              alt="Identification Document Preview"
              className={styles.IdPreviewImg}
            />
            {selectedIdDocsFileName ? (
              <Text
                size="Default"
                content={selectedIdDocsFileName}
                className={styles.texts}
              />
            ) : (
              <Text
                size="Default"
                content={idDocsPreviewName!}
                className={styles.texts}
              />
            )}
          </div>
        )}
      </div>

      <div>
        <Text
          size="Default"
          style={{ fontWeight: '700', marginBottom: '10px' }}
        >
          Upload Proof of Address
        </Text>
        {!proofOfAddressFiles &&
        !proofOfAddressPreview &&
        !proofOfAddressPreviewName &&
        !selectedProofOfAddressFileName ? (
          <div
            className={styles.IdDocs}
            onDrop={handleDropProofOfAdress}
            onDragOver={handleDragOver}
          >
            <input
              id="proofOfAddressInput"
              type="file"
              name="proofOfAddressInput"
              ref={proofOfAddressInputRef}
              onChange={(e) => handleProofOfAddressInputChange(e)}
              hidden
            />

            <Text size="Small" className={styles.IdDocsText}>
              <span>
                Drop your files here or{' '}
                <button
                  type="button"
                  onClick={() => proofOfAddressInputRef.current!.click()}
                  style={{
                    color: 'var(--primary-600)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Browse
                </button>
              </span>
              <br />
              <p
                style={{
                  textAlign: 'center',
                  color: 'var(--gray-400)',
                  marginTop: '17.5px',
                }}
              >
                Maximum size: 50MB
              </p>
            </Text>
          </div>
        ) : (
          <div className={styles.proofOfAddressImgText}>
            <img
              src={proofOfAddressPreview!}
              alt="Proof of Address  Preview"
              className={styles.proofOfAddressPreviewImg}
            />
            {selectedProofOfAddressFileName ? (
              <Text
                content={selectedProofOfAddressFileName}
                className={styles.texts}
              />
            ) : (
              <Text
                size="Default"
                content={proofOfAddressPreviewName!}
                className={styles.texts}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default FilesDragAndSelected
