<template>
    <div id="app">
        <div class="app-container">
            <div class="app-control-panel">
                <img
                    class="app-logo"
                    alt="Vue logo"
                    src="./assets/logo.png"
                >
                <div class="app-works">
                    <h2>List of works</h2>
                    <BaseSwitchCollection
                        :flags="need"
                    />
                </div>
            </div>
        </div>
        <div
            v-if="need.HelloWorld"
            class="app-container"
        >
            <div class="app-wrapper">
                <HelloWorld
                    msg="Welcome to Your Vue.js App"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import BaseSwitchCollection from './components/Base/BaseCheckboxCollection.vue'
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
            BaseSwitchCollection,
            HelloWorld,
        },
        data() {
            return {
                need: {
                    HelloWorld: true,
                },
            };
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    .app-logo {
        margin: 0 auto;
        display: block;
    }

    .app-container {
        margin: 10px auto;
        width: 980px;
    }

    .app-wrapper {
        border: 2px solid #eee;
        padding: 5px;
    }

    .app-control-panel {
        display: flex;
    }

    .app-works {
        margin-left: -250px;
        width: 250px;
    }
</style>
