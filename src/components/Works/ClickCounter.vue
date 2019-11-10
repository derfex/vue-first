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
    const storeModuleName = 'clickCounter'

    export default {
        name: 'ClickCounter',
        computed: {
            count() {
                return this.$store.state[storeModuleName].count
            },
        },
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
