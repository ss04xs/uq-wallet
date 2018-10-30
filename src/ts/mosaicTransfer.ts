import nem from 'nem-sdk';

// EndpointをTestnetに指定します
// 第1引数はTestnet用のデフォルトのノード
// 第2引数はデフォルトのポート(7890)
export default class mosaicTransfer {
    endpoint: string = ''
    toAddress: string = ''
    sendAmount: number = 0
    sendMsg: string = ''
    password: string = ''
    privateKey: string = ''
    common: string = ''
    yourMosaicNamespace: string = ''
    yourMosaicName: string = ''
    host: string = ''
    port: string = ''
    net: string = ''

    constructor () {
        // NIS設定.
        this.host = 'https://aqualife2.supernode.me'
        this.port = '7891'
        this.net = nem.model.network.data.mainnet.id
        this.endpoint = nem.model.objects.create("endpoint")(this.host, this.port)  
        // TODO: 自分の送金したい先のアドレスに変更してください
        // 送金先のアドレス  
        this.toAddress = 'TAHPGS7CKZAERDU5RGHRCGN4DYGXRLQXO5CPNWIP'
        this.sendAmount = 1
        // 送金の際に指定するメッセージ（空文字でも可）
        this.sendMsg = 'Hello World!'
        // TODO: 自分の送金元ウォレットのパスワードを入力してください
        // 送金元ウォレットのパスワード
        this.password = ''
        // TODO: 自分の送金元の秘密鍵を入力してください
        // 送金元の秘密鍵
        this.privateKey = ''
        this.common = nem.model.objects.create('common')(this.password, this.privateKey)
        // TODO: 送りたいモザイクのネームスペースを入力してください
        // ネームスペース
        this.yourMosaicNamespace = 'daiki-sekiguchi'
        // TODO: 送りたいモザイクのモザイク名を入力してください
        // モザイク名
        this.yourMosaicName = 'test'
    }
    
    async sendMosaics(address:string, privateKey:string, mosaics:Array<any>, message:string) {
        // Transactionの作成
        let transferTransaction = nem.model.objects.create('transferTransaction')(this.toAddress, this.sendAmount, this.sendMsg);
        // XEM mosaicを付与する
        const xemMozaic = nem.model.objects.create('mosaicAttachment')('nem', 'xem', this.sendAmount * 1000000);
        transferTransaction.mosaics.push(xemMozaic);
        // 送りたいXEM以外のmosaicを付与する
        const yourMosaic = nem.model.objects.create('mosaicAttachment')(this.yourMosaicNamespace, this.yourMosaicName, 10000);
        transferTransaction.mosaics.push(yourMosaic);
        // 手数料を正確に計算するためにモザイクの定義を取得する
        let mosaicDefinitionMetaDataPair = nem.model.objects.get('mosaicDefinitionMetaDataPair');
        nem.com.requests.namespace.mosaicDefinitions(this.endpoint, yourMosaic.mosaicId.namespaceId).then((res: any) => {
            // モザイク定義を取得してモザイク定義オブジェクトへ格納する
            const neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, [this.yourMosaicName]);
    
            // モザイク定義オブジェクトで使用するため、モザイクの名前を取得
            const fullMosaicName  = nem.utils.format.mosaicIdToName(yourMosaic.mosaicId);
    
            // モザイクの存在確認
            if (undefined === neededDefinition[fullMosaicName]) {
                return console.log('Mosaic not found !');
            }
    
            // モザイクの定義をモザイク定義オブジェクトへ追加する
            mosaicDefinitionMetaDataPair[fullMosaicName] = {};
            mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName];
    
            nem.com.requests.mosaic.supply(this.endpoint, fullMosaicName).then((supplyRes: any) => {
                // 供給量をmosaicDefinitionMetaDataPairに設定する。
                mosaicDefinitionMetaDataPair['nem:xem'].supply = 8999999999;
                mosaicDefinitionMetaDataPair[fullMosaicName].supply = supplyRes.supply;
    
                // 署名をしてTransactionを送信する準備を完了する
                const transactionEntity = nem.model.transactions.prepare('mosaicTransferTransaction')(this.common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.testnet.id);
    
                // Transactionをブロードキャストしてネットワークへ公開する
                nem.model.transactions.send(this.common, transactionEntity, this.endpoint).then((sendRes: any) => {
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
}