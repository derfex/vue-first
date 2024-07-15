<script lang="ts">
import { GamePlayersService } from '../../entities/game-players/game-players.service'
import type { GamePlayer } from '../../entities/game-players/game-players.type'

export default {
  name: 'UserBrowser',
  data() {
    return {
      hover: {
        has: false,
        id: null,
      },
      list: [] as UserForUserBrowser[],
      newUser: {
        id: 1,
        name: '',
        score: 0,
      } as GamePlayer,
      searchString: '',
      sortState: {
        ascending: true,
        buttonText: '↓',
      },
    }
  },

  computed: {
    processedList() {
      return this.list
        .slice(0)
        .filter((item: UserForUserBrowser) =>
          item.nameLowerCase.includes(this.searchString.toLocaleLowerCase()),
        )
        .sort((a: UserForUserBrowser, b: UserForUserBrowser): number =>
          this.sortState.ascending ? a.score - b.score : b.score - a.score,
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
    tableHoverTurnOff(): void {
      this.hover.has = false
      this.hover.id = null
    },
    tableHoverSetID(id: number): void {
      this.hover.has = true
      this.hover.id = id
    },
    tableHoverActionIsVisible(id: number): boolean {
      return this.hover.has && this.hover.id === id
    },
    // endregion ## Table hover

    sort() {
      this.sortState.ascending = !this.sortState.ascending
      this.sortState.buttonText = this.sortState.ascending ? '↓' : '↑'
    },
    remove(id: number): void {
      for (let i = this.list.length - 1; i > -1; --i) {
        const user: UserForUserBrowser = this.list[i]
        if (user.id === id) {
          this.list.splice(i, 1)
          return
        }
      }
    },
    add(name: UserForUserBrowser['name'], score: UserForUserBrowser['score']) {
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

interface UserForUserBrowser {
  readonly id: GamePlayer['id']
  readonly name: GamePlayer['name']
  readonly nameLowerCase: GamePlayer['name']
  readonly score: GamePlayer['score']
}

function getUsers(): ReadonlyArray<GamePlayer> {
  return GamePlayersService.readList()
}

function prepareUsers(users: ReadonlyArray<GamePlayer>): ReadonlyArray<UserForUserBrowser> {
  return users.map((user): UserForUserBrowser => {
    return {
      ...user,
      nameLowerCase: user.name.toLocaleLowerCase(),
    }
  })
}

function fillDefaultList(): void {
  this.list = prepareUsers(getUsers())
  this.newUser.id = this.list.length + 1
}
</script>

<template>
  <div class="app-root">
    <button @click="resetUserList">Reset user list</button>
    <br />
    <table class="app-list">
      <thead>
        <tr class="app-list__row">
          <th class="app-list__cell">ID</th>
          <th class="app-list__cell">
            Name
            <input type="text" placeholder="Find…" v-model="searchString" />
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
            ></button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="app-list__row">
          <td class="app-list__cell"></td>
          <td class="app-list__cell">
            <input type="text" placeholder="Name" v-model="newUser.name" />
          </td>
          <td class="app-list__cell">
            <input type="number" placeholder="Score" v-model="newUser.score" />
          </td>
          <td class="app-list__cell">
            <button
              class="app-list__add"
              title="Add"
              @click="add(newUser.name, newUser.score)"
            ></button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

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
    width: 33px;
  }
}

#{$list}__remove:after {
  content: '×';
}

#{$list}__add:after {
  content: '+';
}
</style>
