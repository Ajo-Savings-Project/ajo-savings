import classNames from 'classnames'
import { Text } from 'components'
import { useState } from 'react'
import styles from './settings.module.scss'
const data = [
  {
    section: 'Communication Settings',
    items: [
      {
        label: 'Email Notifications',
        description: 'Receive Important Updates and Notifications via email',
        accessor: true,
      },
    ],
  },
  {
    section: 'Group Preferences',
    items: [
      {
        label: 'Contribution Reminders',
        description:
          'Enable automated reminders to contribute to your savings group',
        accessor: true,
      },
      {
        label: 'Group Join Requests',
        description: 'Allow others to send join requests to your savings group',
        accessor: true,
      },
    ],
  },
  {
    section: 'Security Settings',
    items: [
      {
        label: 'Two Factor Authentication',
        description:
          'Enhance the security of your account with two-factor authentication',
        accessor: true,
      },
      {
        label: 'Password Update',
        description: 'Change your account password for added security',
        accessor: false,
      },
    ],
  },
  {
    section: 'Privacy Settings',
    items: [
      {
        label: 'Profile Visibility',
        description:
          'Control the visibility of your profile to other Ajo Savings users',
        accessor: true,
      },
      {
        label: 'Email Privacy',
        description:
          'Choose whether to display your email address publicly or keep it private',
        accessor: false,
      },
    ],
  },
  {
    section: 'Notification Preferences',
    items: [
      {
        label: 'Savings Group Updates',
        description:
          'Customize your notification preferences for savings group activities',
        accessor: false,
      },
      {
        label: 'Personal Savings Alerts',
        description:
          'Choose the types of alerts you want to receive for personal savings account',
        accessor: true,
      },
    ],
  },
  {
    section: 'Account Deactivation',
    items: [
      {
        label: 'Deactivate Account',
        description:
          'Temporarily suspend or deactivate your Ajo Savings account',
        accessor: false,
      },
    ],
  },
]
const SettingsPage = () => {
  const [settings] = useState(data)

  return (
    <div className={classNames('container', styles.setting)}>
      <Text size={'Subheading'} content={'Settings'} />

      <div className={styles.settingWrapper}>
        {settings.map((setting, index) => (
          <div key={index} className={styles.settingWrapperText}>
            <Text size={'Subtext'} content={setting.section} />
            {setting.items.map((item, index) => (
              <div key={index} style={{ paddingBottom: '10px' }}>
                <Text
                  size={'Default'}
                  content={item.label}
                  style={{ fontWeight: '500' }}
                />
                <div className={styles.settingWrapperTextWithInput}>
                  <Text size={'Small'} content={item.description} />
                  {item.accessor ? (
                    <div className={styles.settingWrapperInputContainer}>
                      <button
                        className={styles.settingWrapperInputButton}
                      ></button>
                      <input className={styles.settingWrapperInput} readOnly />
                    </div>
                  ) : (
                    <div className={styles.settingWrapperInputContainerFalse}>
                      <button
                        className={styles.settingWrapperInputButtonFalse}
                      ></button>
                      <input
                        className={styles.settingWrapperInputFalse}
                        readOnly
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingsPage
