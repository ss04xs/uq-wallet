<template>
<div class="wallet">
    <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-container fluid class="v-main paTop0">
        <v-card-actions class="padding0">
          <v-card-title></v-card-title>
          <v-spacer />
          <v-btn fab small flat @click="getAccount()" :loading="isLoading"><v-icon>cached</v-icon></v-btn>
        </v-card-actions>
        <v-card flat class="v-shadow maBottom30">
          <span class="tile_board uq_color">{{ wallet.mosaic_name }}残高</span>
          <v-card-text class="pa10">{{ wallet.mosaic_balance }} {{ wallet.mosaic_name }}</v-card-text>
        </v-card>
        <v-card flat class="v-shadow maBottom30">
          <span class="tile_board sinsei_color">有給申請</span>
          <v-card-title>有給取得可能日数：　{{ wallet.uq_day }}日{{ wallet.uq_hours }}時間{{ wallet.uq_minutes }}分</v-card-title>
          <div v-for="(item, index) in validation" :key="index" class="errorLabel">
            <div v-if="item!==true">{{ item }}</div>
          </div>
          <v-text-field class="v-form"
            label="UQ 1時間 = 100UQ"
            v-model="toAmount"
            type="number"
            placeholder="1時間:100UQ "
          ></v-text-field>
          <v-text-field class="v-form"
            label="備考"
            v-model="message"
            :counter="1024"
            placeholder="例：私用のため"
          ></v-text-field>
          <v-flex class="paBottom10">
            <v-btn color="blue" class="white--text" @click="openModal()">送金</v-btn>
          </v-flex>
        </v-card>
        <v-card flat class="v-shadow maBottom30">
          <span class="tile_board nem_color">XEM残高</span>
          <v-card-text class="pa10">{{ wallet.balance }} xem</v-card-text>
        </v-card>
        <v-card flat class="v-shadow">
          <span class="tile_board address_color">アドレス</span>
          <v-card-text class="pa10">{{ wallet.address }}</v-card-text>
          <qriously v-model="qrJson" :size="qrSize" ></qriously>
        </v-card>
        <a class="to_edit_btn" href="https://uq-data.herokuapp.com/"><span class="oi oi-cog"></span></a>
      </v-container>
    </v-card>
    </v-flex>
    <div class="example-modal-window">
    <p>ボタンを押すとモーダルウィンドウが開きます</p>
    <button @click="openModal">開く</button>
    <!-- コンポーネント ConfirmationModal -->
    <ConfirmationModal @close="closeModal" v-if="modal">
      <!-- default スロットコンテンツ -->
      <p>Vue.js Modal Window!</p>
      <div><input v-model="message"></div>
      <!-- /default -->
      <!-- footer スロットコンテンツ -->
      <template slot="footer">
        <button @click="doSend">送信</button>
      </template>
      <!-- /footer -->
    </ConfirmationModal>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import nemWrapper from '../ts/nemWrapper'
import walletModel from '../ts/walletModel'
import mosaicTransfer from '../ts/mosaicTransfer'
import ConfirmationModal from './ConfirmationModal.vue'

@Component({
  name: 'wallet',
  data: () => ({
    nem: new nemWrapper(),
    modal: false,
    qrJson: '',
    rules: {
      senderAddrLimit: (value:string) => (value && (value.length === 46 || value.length === 40)) || '送金先アドレス(-除く)は40文字です。',
      senderAddrInput: (value:string) => {
        const pattern = /^[a-zA-Z0-9-]+$/
        return pattern.test(value) || '送金先の入力が不正です'
      },
      amountLimit: (value:number) => (value >= 0) || '数量を入力してください',
      amountInput: (value:string) => {
        const pattern = /^[0-9.]+$/
        return (pattern.test(value) && !isNaN(Number(value))) || '数量の入力が不正です'
      },
      messageRules: (value:string) => (value.length <= 1024) || 'メッセージの最大文字数が超えています。'
    }
  }),
  watch: {
    'wallet.address' (newVal, oldVal) {
      this.$data.qrJson = this.$data.nem.getQRcodeJson('2', 2, '', newVal, 0, '')
    }
  },
  components: { ConfirmationModal }
})

export default class Wallet extends Vue {
  isLoading:boolean = false
  wallet:walletModel = new walletModel()
  qrSize:number = 200
  toAmount:number = 0
  toAddr:string = 'NB6ADFCKPLSHP2WGPNDT3PLLSTXEA3YYAGMSQBPB'
  message:string = ''
  validation:Array<any> = []

  mounted () {}

  //modal
  openModal() {
    this.$data.modal = true
  }
  closeModal() {
    this.$data.modal = false
  }
  doSend() {
    if (this.$data.message.length > 0) {
      alert(this.toAmount + this.$data.message+"の内容で送信します。")
      this.$data.modal = false
      this.test_tapSend()
    } else {
      alert('メッセージを入力してください')
    }
  }
  //

  async getAccount () {
    this.isLoading = true
    await this.wallet.getAccount()
    this.isLoading = false
  }

  async tapSend() {
    console.log('tapSend')
    if (this.isValidation() === true) {
      let result = await this.wallet.sendNem(this.toAddr, this.toAmount, this.message)
      console.log('tapSend', result)
      let message = '送金しました'
      if (result.message !== 'SUCCESS') {
        message = "Error " + result.message
      }
      Vue.prototype.$toast(message)
    }
  }

  async test_tapSend() {
    console.log('test_tapSend')
    let request = new XMLHttpRequest();
    let url = "http://localhost:3000/api/v1/users/send_massege/NCSFJQCEG6XAOYG6L23GLZ64XJ3FOF73RET6KKKD?message="
    let message = this.toAmount + "_" + this.message
    let request_url = url + message
  console.log(request_url)
    request.open('GET', request_url);
    request.onreadystatechange = function () {
        if (request.readyState != 4) {
            // リクエスト中
        } else if (request.status != 200) {
            // 失敗
        } else {
            // 取得成功
            // var result = request.responseText;
        }
    };
    request.send(null);
    console.log('tapSend', message)
  }

  isValidation(): Boolean {
    this.validation = []
    this.validation.push(this.$data.rules.senderAddrLimit(this.toAddr))
    this.validation.push(this.$data.rules.senderAddrInput(this.toAddr))
    this.validation.push(this.$data.rules.amountLimit(this.toAmount))
    this.validation.push(this.$data.rules.amountInput(this.toAmount))
    this.validation.push(this.$data.rules.messageRules(this.message))
    console.log(this.validation)
    let isError:Boolean = false
    this.validation.forEach((obj:any) => {
      if (obj !== true) { isError = true }
    })
    return !isError
  }
}

</script>
<style scoped>
.wallet {
  word-break: break-all;
  padding-top: 56px;
}
.errorLabel {
  color: red;
}
.v-form {
  padding: 10px 20px;
}

.v-main {
  background-color: #F0EFF5;
  border-radius: 0;
}

.v-card {
  box-shadow: none;
}

.v-shadow {
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

.v-card__text {
  background-color: #fff;
}

.tile_board {
  width: 80px;
  height: 30px;
  display: block;
  color: #fff;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-left: 12px;
  padding: 5px;
}

.uq_color {
  background-color: #00C6B2;
}

.nem_color {
  background-color: #EEA51B;
}

.sinsei_color {
  background-color: #60B4EA;
}

.address_color {
  background-color: #ec611c;
}

.maBottom0 {
  margin-bottom: 0;
}

.maBottom30 {
  margin-bottom: 30px;
}

.pa10 {
  padding: 10px;
}

.padding0 {
  padding: 0px;
}

.paTop0 {
  padding-top: 0px;
}

.paTop30 {
  padding-top: 30px;
}

.paBottom10 {
  padding-bottom: 10px;
}
.to_edit_btn {
  position: fixed;
  bottom: 10px; 
  right: 10px;
  padding: 3px;
  font: inherit;
  background: #33b8b3;
  font-family: -apple-system,'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 56px;
  height: 56px;
  text-decoration: none;
  font-size: 25px;
  line-height: 56px;
  letter-spacing: 0;
  color: #fff !important;;
  border: 0 solid currentColor;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,.12);
  transition: all .1s linear;
}
</style>