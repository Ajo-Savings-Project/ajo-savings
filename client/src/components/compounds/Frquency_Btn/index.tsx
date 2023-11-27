import { Select } from "components"

const FrequencyBtn = () => {
    return (
        <div>
            <Select name='frequency' label="frequency" options={[{ label: 'Pick your frquency', value: '', disabled: true }, { label: 'Daily', value: '1' }, { label: 'Weekly', value: '2' }, { label: 'Monthly', value: '3' }, { label: 'Yearly', value: '4' }]} />

        </div>
    )
}

export default FrequencyBtn