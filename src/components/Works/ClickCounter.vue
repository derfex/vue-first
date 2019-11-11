<template>
    <div>
        <div class="summation">
            <h2>Records</h2>
            <ol class="records">
                <li
                    v-for="(record, index) in records"
                    :key="index"
                >
                    {{ record.type }} — {{ record.value }}
                </li>
            </ol>
        </div>
        <p>
            <label>
                <input
                    type="number"
                    v-model.number="customNumber"
                >
                <button @click="appendCustom">Append custom</button>
            </label>
            <button @click="appendSystem">Append system</button>
        </p>
        <hr class="separator">
        <p>{{ count }}</p>
        <p>
            <button @click="decrement">–</button>
            <button @click="increment">+</button>
        </p>
        <hr class="separator">
        <p>{{ total }}</p>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
    } from 'vuex'

    const storeModuleName = 'clickCounter'
    const getRandomInteger = function getRandomInteger(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min))
    }

    export default {
        name: 'ClickCounter',
        data() {
            return {
                customNumber: 0,
            }
        },
        computed: {
            ...mapState({
                records: state => state[storeModuleName].records,
                count: state => state[storeModuleName].count,
            }),
            ...mapGetters({
                recordsSum: storeModuleName + '/recordsSum',
            }),
            total() {
                return this.recordsSum + this.count
            },
        },
        methods: {
            // region ## The first sum
            appendCustom() {
                this.$store.commit(storeModuleName + '/appendRecord', {
                    type: 'CUSTOM',
                    value: this.customNumber,
                })
            },
            appendSystem() {
                this.$store.commit(storeModuleName + '/appendRecord', {
                    type: 'SYSTEM',
                    value: getRandomInteger(-50, 50),
                })
            },
            // endregion ## The first sum

            // region ## Additional count
            increment() {
                this.$store.commit(storeModuleName + '/increment')
            },
            decrement() {
                this.$store.commit(storeModuleName + '/decrement')
            },
            // endregion ## Additional count
        },
    }
</script>

<style lang="scss" scoped>
    $color_border: #eee;


    .records {
        overflow-y: auto;
        border: 1px solid $color_border;
        height: 100px;
        font-family: monospace;
    }

    .separator {
        border: 1px solid $color_border;
    }
</style>
