import classNames from 'classnames'
import { Button, Input, Select, Text } from 'components'
import styles from './play.module.scss'
import TextArea from 'components/elements/TextBox/TextArea'

const textContent = 'the quick brown fox jumps over the lazy dog'

const Playground = () => {
  return (
    <section className={classNames('container', styles.playground)}>
      <Text
        font={'Bodoni'}
        size={'Heading'}
        level={1}
        content={'Ajo Component Playground'}
      />
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
          <Input
            label={'Phone Number'}
            type={'text'}
            placeholder="Enter your phone nunmber"
          />
          <Input
            label={'Password'}
            type={'password'}
            placeholder="*****************"
          />
          <Select
            label={'Select'}
            options={[
              { label: 'label', value: '2' },
              { label: 'label', value: '3' },
              { label: 'label', value: '4' },
            ]}
          />
          <TextArea label={'discription'} />
        </div>
      </section>
    </section>
  )
}

export default Playground
