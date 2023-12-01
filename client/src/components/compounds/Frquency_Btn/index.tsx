import { Select } from "components"
import styles from './FrequencyBtn.module.scss'
import ima from './../../../assets/svg/arrow_drop_down.svg'

const FrequencyBtn = () => {
    return (
        <div>
            <div className={styles.frequency_container}>
                <Select className={styles.select_frequency} name='frequency' label="frequency" options={[{ label: 'Pick your frquency', value: '', }, { label: 'Daily', value: '1' }, { label: 'Weekly', value: '2' }, { label: 'Monthly', value: '3' }, { label: 'Yearly', value: '4' }]} />
                <img className={styles.frequency_dropdown} src={ima} alt="" />
            </div>
        </div>
    )
}

export default FrequencyBtn