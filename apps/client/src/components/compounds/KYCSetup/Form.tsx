import { Text, Select, Input, Button } from 'components'
import React, { useState, useRef } from 'react'
import { useAuth } from 'contexts'
import styles from './kyc.module.scss'
import { appNotify } from 'components'

const Form = () => {
  const [idDocsFiles, setIdDocsFiles] = useState<FileList | null>(null)
  const [proofOfAddressFiles, setProofOfAddressFiles] =
    useState<FileList | null>(null)
  const [idDocsPreview, setIdDocsPreview] = useState<string | null>(null)
  const [proofOfAddressPreview, setProofOfAddressPreview] = useState<
    string | null
  >(null)
  const { handleStateUpdate } = useAuth()

  const genderRef = useRef<HTMLSelectElement>(null)
  const occupationRef = useRef<HTMLSelectElement>(null)
  const dobRef = useRef<HTMLInputElement>(null)
  const idTypeRef = useRef<HTMLSelectElement>(null)
  const bvnef = useRef<HTMLInputElement>(null)
  const idNumberRef = useRef<HTMLInputElement>(null)
  const idDocsInputRef = useRef<HTMLInputElement>(null)
  const proofOfAddressInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE_MB = 50

  const handleSubmit = () => {
    handleStateUpdate({ kycComplete: true })
  }

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
  }
  const handleDropIdDocs = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    setIdDocsFiles(files)

    if (files.length > 0 && files[0].size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
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
    setProofOfAddressFiles(files)

    if (files.length > 0 && files[0].size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = () => setProofOfAddressPreview(reader.result as string)
      reader.readAsDataURL(files[0])
    } else {
      appNotify('error', 'File size exceeds the maximum allowed size (50MB).')
      setProofOfAddressFiles(proofOfAddressFiles)
    }
  }
  //Browsing through file... implementation

  const handleFileInputChange = (
    inputFiles: FileList | null,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (inputFiles && inputFiles.length > 0) {
      if (inputFiles[0].size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
        const reader = new FileReader()
        reader.onload = () => setPreview(reader.result as string)
        reader.readAsDataURL(inputFiles[0])
      } else {
        appNotify('error', 'File size exceeds the maximum allowed size (50MB).')
      }
    }
  }

  const handleIdDocsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleFileInputChange(e.target.files, setIdDocsPreview)
  }
  const handleProofOfAddressInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    handleFileInputChange(e.target.files, setProofOfAddressPreview)
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerHeaderText}>
        <Text
          size="Subheading"
          content="Complete Your KYC Verification"
          className={styles.containerHeaderTextBig}
        />
        <Text
          size="Small"
          className={styles.containerHeaderTextSmall}
          font="Inter"
        >
          <span>
            Please complete the KYC verification process to unlock the full
            features and benefits of{' '}
            <span style={{ color: 'var(--primary-600)' }}>Savi</span>
          </span>
        </Text>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.flexDiv}>
          <Select
            id="gender"
            name="gender"
            ref={genderRef}
            label={' Gender'}
            options={[
              { label: 'Select your gender', value: '0' },
              { label: 'Male', value: '1' },
              { label: 'Female', value: '2' },
            ]}
            className={styles.flex}
          />
          <Select
            id="occupation"
            name="occupation"
            ref={occupationRef}
            label={'Occupation'}
            options={[
              { label: 'Select your Occupation', value: '1' },
              { label: 'label', value: '2' },
            ]}
            className={styles.occupation}
          />
        </div>
        <div className={styles.flexDiv}>
          <Input
            id="dob"
            name="dob"
            ref={dobRef}
            label={'Date of Birth'}
            type="date"
            className={styles.Dob}
          />{' '}
          <Select
            id="idType"
            name="idType"
            ref={idTypeRef}
            label={'Identification Type'}
            options={[
              { label: 'Select your type', value: '1' },
              { label: 'label', value: '2' },
            ]}
            className={styles.Identity}
          />
        </div>

        <Input
          id="bvn"
          name="bvn"
          ref={bvnef}
          label={'BVN'}
          placeholder="Input your BVN"
          className={styles.Bvn}
        />
        <Input
          type="text"
          label={'Address'}
          placeholder="Input your Address"
          className={styles.Address}
        />

        <Input
          id="idNumber"
          name="idNumber"
          ref={idNumberRef}
          label={'Identification Number'}
          type="text"
          placeholder="Input your Identification Num"
          className={styles.Idnumber}
        />
        <div>
          <Text
            size="Default"
            style={{ fontWeight: '700', marginBottom: '10px' }}
          >
            Upload Identification Document
          </Text>
          {!idDocsFiles && !idDocsPreview ? (
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
            <img
              src={idDocsPreview!}
              alt="Identification Document Preview"
              className={styles.IdPreviewImg}
            />
          )}
        </div>

        <div>
          <Text
            size="Default"
            style={{ fontWeight: '700', marginBottom: '10px' }}
          >
            Upload Proof of Address
          </Text>
          {!proofOfAddressFiles && !proofOfAddressPreview ? (
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
            <img
              src={proofOfAddressPreview!}
              alt="Proof of Address  Preview"
              className={styles.proofOfAddressPreviewImg}
            />
          )}
        </div>

        <Button
          onClick={handleSubmit}
          style={{ width: '100%', marginTop: '24px' }}
          text="Submit"
        />
      </form>
    </div>
  )
}

export default Form
