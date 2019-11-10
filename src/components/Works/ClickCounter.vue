<template>
    <div>
        <p>{{ count }}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">–</button>
        </p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    const storeModuleName = 'clickCounter'

    export default {
        name: 'ClickCounter',
        computed: mapState({
            count: state => state[storeModuleName].count
        }),
        methods: {
            increment() {
                this.$store.commit(storeModuleName + '/increment')
            },
            decrement() {
                this.$store.commit(storeModuleName + '/decrement')
            },
        },
    }
</script>
