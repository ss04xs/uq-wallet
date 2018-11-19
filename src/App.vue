<template>
  <v-app>
    <header>
      <span>{{ title }} </span>
    </header>
    <main>
      <Wallet/>
    </main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// Walletをimportする.
import Wallet from './components/Wallet.vue'

// コンポーネントの設定
@Component({
  name: 'app',
  // Walletをcomponentとして定義する.
  components: {
    Wallet
  }
})

// クラス
export default class App extends Vue {
  private title = 'SODA UQ wallet'
  mounted () {}
}
</script>

<style>
.application--wrap {
  background-color: #F0EFF5;
}
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
}

header {
  position: fixed;
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 56px;
  padding: 0 16px 0 24px;
  margin-bottom: 4px;
  color: #33b8b3;
  background-color: #fff;
  border-color: #fff;
  text-align: center;
  box-shadow: 0 1px 0px 0px rgba(0,0,0,.2), 0 0px 0px 0 rgba(0,0,0,.14), 0 2px 0px 0 rgba(0,0,0,.12);
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: .02em;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>