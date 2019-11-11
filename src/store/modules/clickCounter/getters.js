export default {
    recordsSum: state => (
        state.records.reduce((previousValue, record) => (
            previousValue + record.value
        ), 0)
    ),
}
