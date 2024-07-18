<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { GamePlayersService } from '../../entities/game-players/game-players.service'
import type { GamePlayer } from '../../entities/game-players/game-players.type'

// # data.
const hover = ref<BrowserHoverData>({
  has: false,
  id: null,
})
const list = ref<BrowserRecord[]>([])
const formRecord = ref<GamePlayerForForm>({
  id: 1,
  name: '',
  score: 0,
})
const searchString = ref<string>('')
const sortingState = ref({
  ascending: true,
  buttonText: '↓',
})

// # computed.
const processedList = computed(() => {
  return list.value
    .filter((item: BrowserRecord) =>
      item.nameLowerCase.includes(searchString.value.toLocaleLowerCase()),
    )
    .sort((a: BrowserRecord, b: BrowserRecord): number =>
      sortingState.value.ascending ? a.score - b.score : b.score - a.score,
    )
})

// # created.
onMounted(() => {
  fillDefaultList()
})

// # methods.
function resetList() {
  fillDefaultList()
}

// region ## Table hover
// For this purpose CSS is more suitable. Task: implement using Vue.js.
function tableHoverTurnOff(): void {
  hover.value.has = false
  hover.value.id = null
}
function tableHoverSetID(id: number): void {
  hover.value.has = true
  hover.value.id = id
}
function tableHoverActionIsVisible(id: number): boolean {
  return hover.value.has && hover.value.id === id
}
// endregion ## Table hover

function add(name: BrowserRecord['name'], score: BrowserRecord['score']) {
  const nameLowerCase = name.toLowerCase()
  const gamePlayer = {
    id: formRecord.value.id++,
    name,
    nameLowerCase,
    score,
  }
  list.value.push(gamePlayer)
}

function sort() {
  sortingState.value.ascending = !sortingState.value.ascending
  sortingState.value.buttonText = sortingState.value.ascending ? '↓' : '↑'
}

function remove(id: number): void {
  for (let i = list.value.length - 1; i > -1; --i) {
    const gamePlayer: BrowserRecord = list.value[i]
    if (gamePlayer.id === id) {
      list.value.splice(i, 1)
      return
    }
  }
}

// # private.
interface GamePlayerForGamePlayersBrowser {
  readonly id: GamePlayer['id']
  readonly name: GamePlayer['name']
  readonly nameLowerCase: GamePlayer['name']
  readonly score: GamePlayer['score']
}

type BrowserRecord = GamePlayerForGamePlayersBrowser

interface GamePlayerForForm {
  id: GamePlayer['id']
  readonly name: GamePlayer['name']
  readonly score: GamePlayer['score']
}

interface BrowserHoverData {
  id: GamePlayer['id'] | null
  has: boolean
}

function fillDefaultList(): void {
  list.value = [...prepareGamePlayers(getGamePlayers())]
  formRecord.value.id = list.value.length + 1
}

function getGamePlayers(): ReadonlyArray<GamePlayer> {
  return GamePlayersService.readList()
}

function prepareGamePlayers(gamePlayers: ReadonlyArray<GamePlayer>): ReadonlyArray<BrowserRecord> {
  return gamePlayers.map((gamePlayer): BrowserRecord => {
    return {
      ...gamePlayer,
      nameLowerCase: gamePlayer.name.toLocaleLowerCase(),
    }
  })
}
</script>

<template>
  <div class="app-root">
    <button @click="resetList">Reset game players list</button>
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
            <button @click="sort">{{ sortingState.buttonText }}</button>
          </th>
          <th class="app-list__cell"></th>
        </tr>
      </thead>
      <tbody class="app-list__body">
        <tr
          class="app-list__row"
          v-for="gamePlayer in processedList"
          :key="gamePlayer.id"
          @mouseover="tableHoverSetID(gamePlayer.id)"
          @mouseout="tableHoverTurnOff"
        >
          <td class="app-list__cell">{{ gamePlayer.id }}</td>
          <td class="app-list__cell">{{ gamePlayer.name }}</td>
          <td class="app-list__cell app-list__cell--score">{{ gamePlayer.score }}</td>
          <td class="app-list__cell app-list__cell--actions">
            <button
              class="app-list__remove"
              v-show="tableHoverActionIsVisible(gamePlayer.id)"
              @click="remove(gamePlayer.id)"
              title="Remove"
            ></button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="app-list__row">
          <td class="app-list__cell"></td>
          <td class="app-list__cell">
            <input type="text" placeholder="Name" v-model="formRecord.name" />
          </td>
          <td class="app-list__cell">
            <input type="number" placeholder="Score" v-model="formRecord.score" />
          </td>
          <td class="app-list__cell">
            <button
              class="app-list__add"
              title="Add"
              @click="add(formRecord.name, formRecord.score)"
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
