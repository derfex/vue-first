export default {
    // region ## records
    appendRecord(state, payload) {
        const {
            type = 'SECRET',
            value = 0,
        } = {
            ...payload,
        }
        state.records.push({
            type,
            value,
        })
    },
    // endregion ## records

    // region ## count
    increment: state => state.count++,
    decrement: state => state.count--,
    // endregion ## count
}
