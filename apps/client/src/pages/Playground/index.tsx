import classNames from 'classnames'
import {
  Button,
  Input,
  Select,
  Text,
  Textarea,
  Modal,
  InfoCard,
  appNotify,
  Switcher,
} from 'components'
import styles from './play.module.scss'

import Form from 'components/compounds/KYCSetup/Form'

const textContent = 'the quick brown fox jumps over the lazy dog'

const Playground = () => {
  const notify = () => appNotify('success', 'created successfully')
  const notifyWarning = () => appNotify('error', 'Error creating User')
  const emoji = () => appNotify('info', 'works!')
  const retry = () => appNotify('info', 'works!', notify, { duration: 500 })

  const handleChange = (checked: boolean) => {
    console.log('Switcher value:', checked)
  }

  return (
    <section className={classNames('container', styles.playground)}>
      <Modal
        renderOnOpen={({ onOpen }) => <button onClick={onOpen}>add</button>}
        renderModalContent={({ onClose }) => (
          <InfoCard
            onClick={onClose}
            text="Account Updated!"
            Subtext="Your Account has been updated successfully."
          />
        )}
      />
      <Switcher onChange={handleChange} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={notify} text={'Success'} />
        <Button onClick={notifyWarning} text={'Failed'} />
        <Button onClick={emoji} text={'Show emoji'} />
        <Button onClick={retry} text={'Show with retry'} />
      </div>

      <Text
        font={'Bodoni'}
        size={'Heading'}
        level={1}
        content={'Ajo Component Playground'}
      />

      <Form />

      <section>
        <Text
          level={2}
          font={'Bodoni'}
          size={'Subheading'}
          content={'Buttons'}
        />
        <div>
          <Button text={'Get Started'} />
          <br /> <br />
          <Button kind={'rounded'} text={'Get Started'} />
        </div>
      </section>
      <section>
        <Text
          level={2}
          font={'Bodoni'}
          size={'Subheading'}
          content={'Typography'}
        />
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <td>Tag</td>
                  <td>Example</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>h1</td>
                  <td>
                    <Text level={1} content={textContent} />
                  </td>
                </tr>
                <tr>
                  <td>h2</td>
                  <td>
                    <Text level={2} content={textContent} />
                  </td>
                </tr>
                <tr>
                  <td>h3</td>
                  <td>
                    <Text level={3} content={textContent} />
                  </td>
                </tr>
                <tr>
                  <td>h4</td>
                  <td>
                    <Text level={4} content={textContent} />
                  </td>
                </tr>
                <tr>
                  <td>h5</td>
                  <td>
                    <Text level={5} content={textContent} />
                  </td>
                </tr>
                <tr>
                  <td>h6</td>
                  <td>
                    <Text level={6} content={textContent} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <div>
            <Text font={'Bodoni'} size={'Heading'} content={textContent} />
            <Text font={'Bodoni'} size={'Subheading'} content={textContent} />
            <Text font={'Bodoni'} size={'Subtext'} content={textContent} />
            <Text font={'Bodoni'} size={'Label'} content={textContent} />
            <Text font={'Bodoni'} size={'Default'} content={textContent} />
            <Text font={'Bodoni'} size={'Small'} content={textContent} />
          </div>
        </div>
      </section>
      <section>
        <Text level={2} font={'Bodoni'} size={'Subheading'} content={'Input'} />
        <div>
          <Input label={'Email address'} type={'email'} placeholder={''} />
          <Input
            label={'label'}
            type={'password'}
            placeholder="dghhgshgshsjhsnsnm"
          />
          <Select
            label={'Select'}
            options={[
              { label: 'label', value: '2' },
              { label: 'label', value: '3' },
              { label: 'label', value: '4' },
            ]}
          />
          <Textarea label={'discription'} />
        </div>
        <button className={styles.button}>click me</button>
      </section>
    </section>
  )
}

export default Playground
