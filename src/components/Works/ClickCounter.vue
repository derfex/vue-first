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
    export default {
        name: 'ClickCounter',

        // State.
        data() {
            return {
                count: 0,
            }
        },

        // Actions.
        methods: {
            increment() {
                this.count++
            },
            decrement() {
                this.count--
            },
        },
    }
</script>
