export default {
    // Append a record with arithmetic mean.
    appendMediumRecord(context) {
        const {
            commit,
            getters,
            state: {
                records: {
                    length,
                },
            },
        } = context
        const value = length
            ? Math.floor(getters.recordsSum / length)
            : 0
        commit('appendRecord', {
            type: 'MEDIUM',
            value,
        })
    },
}
