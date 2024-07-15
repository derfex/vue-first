<template>
    <div class="app-root">
        <button @click="resetUserList">Reset user list</button>
        <br>
        <table class="app-list">
            <thead>
            <tr class="app-list__row">
                <th class="app-list__cell">ID</th>
                <th class="app-list__cell">
                    Name
                    <input
                        type="text"
                        placeholder="Find…"
                        v-model="searchString"
                    >
                </th>
                <th class="app-list__cell">
                    Score
                    <button @click="sort">{{ sortState.buttonText }}</button>
                </th>
                <th class="app-list__cell"></th>
            </tr>
            </thead>
            <tbody class="app-list__body">
            <tr
                class="app-list__row"
                v-for="user in processedList"
                :key="user.id"
                @mouseover="tableHoverSetID(user.id)"
                @mouseout="tableHoverTurnOff"
            >
                <td class="app-list__cell">{{ user.id }}</td>
                <td class="app-list__cell">{{ user.name }}</td>
                <td class="app-list__cell app-list__cell--score">{{ user.score }}</td>
                <td class="app-list__cell app-list__cell--actions">
                    <button
                        class="app-list__remove"
                        v-show="tableHoverActionIsVisible(user.id)"
                        @click="remove(user.id)"
                        title="Remove"
                    >
                    </button>
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr class="app-list__row">
                <td class="app-list__cell"></td>
                <td class="app-list__cell">
                    <input
                        type="text"
                        placeholder="Name"
                        v-model="newUser.name"
                    >
                </td>
                <td class="app-list__cell">
                    <input
                        type="number"
                        placeholder="Score"
                        v-model="newUser.score"
                    >
                </td>
                <td class="app-list__cell">
                    <button
                        class="app-list__add"
                        title="Add"
                        @click="add(newUser.name, newUser.score)"
                    >
                    </button>
                </td>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    function getDefaultList() {
        return [
            {
                id: 1,
                name: 'Alisa',
                score: 150,
            },
            {
                id: 2,
                name: 'Bred',
                score: 250,
            },
            {
                id: 3,
                name: 'Charlie',
                score: 350,
            },
            {
                id: 4,
                name: 'Donald',
                score: 450,
            },
            {
                id: 5,
                name: 'Emma',
                score: 550,
            },
        ]
            .map(user => {
                user.nameLowerCase = user.name.toLocaleLowerCase()
                return user
            })
    }

    function fillDefaultList() {
        this.list = getDefaultList()
        this.newUser.id = this.list.length + 1
    }

    export default {
        name: 'UserBrowser',
        data() {
            return {
                searchString: '',
                sortState: {
                    ascending: true,
                    buttonText: '↓',
                },
                list: [],
                hover: {
                    has: false,
                    id: null,
                },
                newUser: {
                    id: 1,
                    name: '',
                    score: 0,
                },
            }
        },

        computed: {
            processedList() {
                return this.list.slice(0)
                    .filter(
                        item => item.nameLowerCase.includes(this.searchString.toLocaleLowerCase()),
                    )
                    .sort(
                        (a, b) => this.sortState.ascending ? a.score - b.score : b.score - a.score,
                    )
            },
        },

        created() {
            fillDefaultList.call(this)
        },

        methods: {
            resetUserList() {
                fillDefaultList.call(this)
            },

            // region ## Table hover
            // For this purpose CSS is more suitable. Task: implement using Vue.js.
            tableHoverTurnOff() {
                this.hover.has = false
                this.hover.id = null
            },
            tableHoverSetID(ID) {
                this.hover.has = true
                this.hover.id = ID
            },
            tableHoverActionIsVisible(ID) {
                return this.hover.has && this.hover.id === ID
            },
            // endregion ## Table hover

            sort() {
                this.sortState.ascending = !this.sortState.ascending
                this.sortState.buttonText = this.sortState.ascending ? '↓' : '↑'
            },
            remove(id) {
                for (let i = this.list.length - 1; i > -1; --i) {
                    const user = this.list[i]
                    if (user.id === id) {
                        this.list.splice(i, 1)
                        return
                    }
                }
            },
            add(name, score) {
                const nameLowerCase = name.toLowerCase()
                const user = {
                    id: this.newUser.id++,
                    name,
                    nameLowerCase,
                    score,
                }
                this.list.push(user)
            },
        },
    }
</script>

<style lang="scss" scoped>
    $prefix: '.app-';
    $list: $prefix + 'list';

    $hover_background: #d9f1e6; /* light color from Vue logo */


    #{$prefix}root {
        font-family: sans-serif;
        color: #333;

        button {
            padding: 1px 5px;
            cursor: pointer;
        }
    }

    #{$list} {
        border-collapse: collapse;

        &__row {
            height: 35px;
        }
    }

    #{$list}__body {
        #{$list}__row:nth-child(odd) {
            background: #f2f2f2;
        }

        #{$list}__row:hover {
            background: $hover_background;
        }
    }

    #{$list}__cell {
        padding: 5px;

        &--score {
            text-align: right;
        }

        &--actions {
            width: 30px;
        }
    }

    #{$list}__remove:after {
        content: '×';
    }

    #{$list}__add:after {
        content: '+';
    }
</style>
