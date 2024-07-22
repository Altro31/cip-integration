// import {Injectable, OnModuleInit} from "@nestjs/common";
// import {generateKeyPairsAsync, PrivateKey, PublicKey} from "@altro-31/publickey-crypt";

// @Injectable()
// export class PublicKeyService implements OnModuleInit {

//     private _publicKey: PublicKey
//     private _privateKey: PrivateKey

//     onModuleInit() {
//         generateKeyPairsAsync().then(this.setKeys.bind(this))
//     }

//     private setKeys({publicKey, privateKey}: Awaited<ReturnType<typeof generateKeyPairsAsync>>) {
//         this._privateKey = privateKey
//         this._publicKey = publicKey
//     }

//     get publicKey() {
//         if (!this._publicKey) throw new Error('Public Key not generated yet')
//         return this._publicKey
//     }

//     get privateKey() {
//         if (!this._privateKey) throw new Error('Private Key not generated yet')
//         return this._privateKey
//     }

// }