import nem from 'nem-sdk';
import localForage from 'localforage';
import nemWrapper from './nemWrapper';

// EndpointをTestnetに指定します
// 第1引数はTestnet用のデフォルトのノード
// 第2引数はデフォルトのポート(7890)
export default class mosaicTransfer {
    endpoint: string = ''
    address: string = ''
    toAddress: string = ''
    sendAmount: number = 0
    sendMsg: string = ''
    password: string = ''
    publicKey: string = ''
    privateKey: string = ''
    common: string = ''
    yourMosaicNamespace: string = ''
    yourMosaicName: string = ''
    host: string = ''
    port: string = ''
    net: string = ''

    nem = new nemWrapper()

    constructor () {
        // NIS設定.
        this.load()
        .then((result) => {
            console.log(result)
            // 無ければアカウントを作成します
            if (result === null) {
                this.nem.createAccount()
                .then((wallet) => {
                    this.address = wallet.address
                    this.privateKey = wallet.privateKey
                }).catch((error) => {
                    console.error(error)
                })
            } else {
            }
        }).catch((error) => {
            console.error(error)
        })

        this.host = 'https://aqualife2.supernode.me'
        this.port = '7891'
        this.net = nem.model.network.data.mainnet.id
        this.endpoint = nem.model.objects.create("endpoint")(this.host, this.port)  
        // TODO: 自分の送金したい先のアドレスに変更してください
        // 送金先のアドレス  
        this.toAddress = 'NAMSMVTFARKVF2TQCGJ6DQY3FWVERS6A3E4ZCNVG'
        this.sendAmount = 1
        // 送金の際に指定するメッセージ（空文字でも可）
        this.sendMsg = 'テスト私用のため'
        // TODO: 自分の送金元ウォレットのパスワードを入力してください
        // 送金元ウォレットのパスワード
        const password = 'wallet'
        //const privateKey = this.privateKey
        //const　common = nem.model.objects.create('common')(password, privateKey)
        // TODO: 送りたいモザイクのネームスペースを入力してください
        // ネームスペース
        this.yourMosaicNamespace = 'so-da'
        // TODO: 送りたいモザイクのモザイク名を入力してください
        // モザイク名
        this.yourMosaicName = "uq"
    }
    
    async sendMosaics(privateKey:string, message:string) {
        console.log("テスト送金！！！")
        console.log(nem.model.nodes.defaultTestnet)
        console.log(nem.model.network.data.mainnet.id)
        const host = 'http://62.75.251.134'
        const port = '7891'
        const net = nem.model.network.data.mainnet.id
        const endpoint = nem.model.objects.create('endpoint')(host, nem.model.nodes.defaultPort);
        console.log(endpoint)
        const toAddress = "NB6ADFCKPLSHP2WGPNDT3PLLSTXEA3YYAGMSQBPB"
        const password = 'wallet'
        const privatekey = privateKey
        const sendAmount = 1
        const yourMosaicNamespace = 'so-da'
        const yourMosaicName = "uq"
        const common = nem.model.objects.create('common')("wallet", privatekey)
        console.log("common: ")
        console.log(common)
        // Transactionの作成
        const transferTransaction = nem.model.objects.create('transferTransaction')(toAddress, sendAmount, message);
        const transferTx = nem.model.objects.create("transferTransaction")(toAddress, 1, "soon");
        console.log(transferTx)
        console.log("adress: "+toAddress)
        const transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTx, nem.model.network.data.mainnet.id);
        console.log("transactionEntity")
        console.log(transactionEntity)
        console.log("send")
        //nem.model.transactions.send(common, transactionEntity, endpoint).then((res: any) => console.log(JSON.stringify(res)));
        // XEM mosaicを付与する
        const xemMozaic = nem.model.objects.create('mosaicAttachment')('nem', 'xem', sendAmount * 1000000);
        transferTransaction.mosaics.push(xemMozaic);
        // 送りたいXEM以外のmosaicを付与する
        const yourMosaic = nem.model.objects.create('mosaicAttachment')(yourMosaicNamespace, yourMosaicName, 10000);

        transferTransaction.mosaics.push(yourMosaic);
        //手数料を正確に計算するためにモザイクの定義を取得する
        let mosaicDefinitionMetaDataPair = nem.model.objects.get('mosaicDefinitionMetaDataPair');
        nem.com.requests.namespace.mosaicDefinitions(endpoint, yourMosaic.mosaicId.namespaceId).then((res: any) => {
            // モザイク定義を取得してモザイク定義オブジェクトへ格納する
            const neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, [yourMosaicName]);
            console.log("neededDefinition" + neededDefinition)
            // モザイク定義オブジェクトで使用するため、モザイクの名前を取得
            const fullMosaicName  = nem.utils.format.mosaicIdToName(yourMosaic.mosaicId);
            console.log("fullMosaicName: "+fullMosaicName)
            // モザイクの存在確認
            if (undefined === neededDefinition[fullMosaicName]) {
                return console.log('Mosaic not found !');
            }
            console.log("モザイクの存在確認OK")
    
            // モザイクの定義をモザイク定義オブジェクトへ追加する
            mosaicDefinitionMetaDataPair[fullMosaicName] = {};
            mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName];
    
            nem.com.requests.mosaic.supply(endpoint, fullMosaicName).then((supplyRes: any) => {
                // 供給量をmosaicDefinitionMetaDataPairに設定する。
                mosaicDefinitionMetaDataPair['nem:xem'].supply = 8999999999;
                mosaicDefinitionMetaDataPair[fullMosaicName].supply = supplyRes.supply;
    
                // 署名をしてTransactionを送信する準備を完了する
                const transactionEntity = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.testnet.id);
    
                // Transactionをブロードキャストしてネットワークへ公開する
                nem.model.transactions.send(common, transactionEntity, endpoint).then((sendRes: any) => {
                    console.log('sendRes:', sendRes);
                }).catch((sendErr: any) => {
                    console.log('sendError:', sendErr);
                });
            }).catch((supplyErr: any) => {
                console.log('supplyErr:', supplyErr);
            });
        }).catch((e: any) => {
            console.log('mosaicDefinitionsError:', e);
        });
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

    //test2
    // 送金（Mosaic）
    async sendMosaics2(address:string, privateKey:string, mosaics:Array<any>, message:string) {
        let common = nem.model.objects.create('common')('', privateKey)
        let transferTransaction = nem.model.objects.create('transferTransaction')(address, 1, message)
        let mosaicDefinitionMetaDataPair:any = await this.getMosaicDefinitionMetaDataPair(this.endpoint, mosaics)
        mosaics.forEach((mosaic) => {
            let fullMosaicName = mosaic.namespace + ':' + mosaic.name
            if ((mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition.id.namespaceId === mosaic.namespace) &&
                (mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition.id.name === mosaic.name)) {
                let divisibility = 0
                mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition.properties.forEach((prop:any) => {
                    if (prop.name === 'divisibility') { divisibility = prop.value }
                })
                let quantity = mosaic.amount * Math.pow(10, divisibility)
                let mosaicAttachment = nem.model.objects.create('mosaicAttachment')(mosaic.namespace, mosaic.name, quantity)
                transferTransaction.mosaics.push(mosaicAttachment)
            }
        })
        let transactionEntity = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitionMetaDataPair, this.net)
        let result = await nem.model.transactions.send(common, transactionEntity, this.endpoint)
        return result
    }
 
    // モザイク定義取得.
    async getMosaicDefinitionMetaDataPair(endpoint:string, mosaics:Array<any>)
    {
        return new Promise(function(resolve, reject) {
            let mosaicDefinitionMetaDataPair = nem.model.objects.get('mosaicDefinitionMetaDataPair')
            let mosaicCount = 0
            mosaics.forEach((mosaic) => {
                let mosaicAttachment = nem.model.objects.create('mosaicAttachment')(mosaic.namespace, mosaic.name, mosaic.amount)
                let result = nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId)
                .then((result: any) => {
                    mosaicCount = mosaicCount + 1
                    let neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(result.data, [mosaic.name])
                    let fullMosaicName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId)
                    if (undefined === neededDefinition[fullMosaicName]) {
                        console.error('Mosaic not found !')
                        return
                    }
                    mosaicDefinitionMetaDataPair[fullMosaicName] = {}
                    mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName]
                    let supply = 0
                    result.data.some((obj: any) => {
                    if ((obj.mosaic.id.namespaceId === mosaic.namespace) &&
                        (obj.mosaic.id.name === mosaic.name)) {
                            obj.mosaic.properties.some((prop: any) => {
                            if (prop.name === 'initialSupply') {
                                supply = prop.value
                                return true
                            }
                        })
                    }
                    })
                    mosaicDefinitionMetaDataPair[fullMosaicName].supply = supply
                    if (mosaicCount >= mosaics.length) { resolve(mosaicDefinitionMetaDataPair) }
                }).catch((e: any) => {
                    console.error(e)
                    reject(e)
                })
            })
        })
    }
}