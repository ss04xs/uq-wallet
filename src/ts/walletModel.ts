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
    uq_day: string = ''
    uq_hours: string = ''
    uq_minutes: string = ''

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
        this.mosaic_name = result.data[1].mosaicId.name.toUpperCase()
        if ( result.data[1].mosaicId.name === "uq" ) {
            this.mosaic_balance = result.data[1].quantity / 1000
            // 有給時間の計算
            let uq_x = this.mosaic_balance / 800
            let uq_fract_d = uq_x * 10 % 10 /10;
            this.uq_day = String(uq_x).split(".")[0]
            this.uq_hours = String(uq_fract_d * 800 / 100).split(".")[0]
            let uq_fract_m = Number(uq_fract_d * 800 / 100) * 10 % 10 /10;
            let uq_fract_m2 = String(uq_fract_m * 100).split(".")[0]
            this.uq_minutes = String(Number(uq_fract_m2)/100 * 60).split(".")[0]
        } else {
            this.mosaic_balance = result.data[1].quantity / this.nem.getNemDivisibility()
        }
    }

    async setData()  {
        let key = 'uq-wallet'
        let result:any = await localForage.getItem(key)
        this.address = "NC4RR7PCDLIUA2JVZATFE6PF5VAGBOSTDQEB7376"
        this.privateKey = "ef5f7fb0e4ec818b30d211cbb7d673088d2dffebe3ae64aae0a4a7cc30b87aeb"
        this.save()
        console.log(result)
        return result
    }

    toJSON() {
        return {
            address: this.address,
            privateKey: this.privateKey,
            publicKey: this.publicKey
        }
    }
}