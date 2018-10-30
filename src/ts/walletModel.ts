import localForage from 'localforage'
import nemWrapper from './nemWrapper'

export default class walletModel {
    balance: number = 0
    address: string = ''
    mosaic: string = ''
    mosaic_name: string = ''
    mosaic_balance: number = 0
    publicKey: string = ''
    privateKey: string = ''

    nem = new nemWrapper()

    constructor() {
        // クラス生成時にローカルストレージからアカウント情報を取得
        this.load()
        .then((result) => {
            console.log(result)
            // 無ければアカウントを作成します
            if (result === null) {
                this.nem.createAccount()
                .then((wallet) => {
                    this.address = wallet.address
                    this.privateKey = wallet.privateKey
                    this.save()
                }).catch((error) => {
                    console.error(error)
                })
            } else {
            // あればNEMの残高を取得します
                this.getAccount()
                this.getAccountMo()
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    // ローカルストレージへ保存.
    async save() {
        let key = 'uq-wallet'
        let result:any = await localForage.setItem(key, this.toJSON())
        return result
    }

    // ローカルストレージから取得.
    async load() {
        let key = 'uq-wallet'
        let result:any = await localForage.getItem(key)
        if (result !== null) {
            this.address = result.address
            this.privateKey = result.privateKey
            this.publicKey = result.publicKey
        }
        return result
    }

    // ローカルストレージから削除.
    async remove() {
        let key = 'uq-wallet'
        let result:any = await localForage.removeItem(key)
        return result
    }

    // アカウント情報を取得.
    async getAccount() {
        let result = await this.nem.getAccount(this.address)
        this.balance = result.account.balance / this.nem.getNemDivisibility()
        if ( result.account.publicKey !== null ) { this.publicKey = result.account.publicKey }
    }

    // 送金(NEM)
    async sendNem(address:string, amount:number, message:string)  {
        let result = await this.nem.sendNem(address, this.privateKey, amount, message)
        return result
    }

    // モザイクの残高取得
    async getAccountMo()  {
        let result = await this.nem.getAccountMo(this.address)
        this.mosaic_name = result.data[1].mosaicId.name.toLowerCase()
        if ( result.data[1].mosaicId.name === "uq" ) {
            this.mosaic_balance = result.data[1].quantity / 1000
        } else {
            this.mosaic_balance = result.data[1].quantity / this.nem.getNemDivisibility()
        }
    }

    toJSON() {
        return {
            address: this.address,
            privateKey: this.privateKey,
            publicKey: this.publicKey
        }
    }
}