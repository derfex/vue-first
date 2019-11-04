<template>
    <div id="app">
        <img
            class="app-logo"
            alt="Vue logo"
            src="./assets/logo.png"
        >
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
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
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
</style>
