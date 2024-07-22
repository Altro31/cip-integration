// import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
// import {PublicKeyService} from "../services/publickey.service";
// import {Request} from "express";
// import {PublicKey} from "@altro-31/publickey-crypt";
// import {map} from "rxjs";

// @Injectable()
// export class AuthInterceptor implements NestInterceptor {

//     constructor(private publicKeyService: PublicKeyService) {
//     }

//     async intercept(context: ExecutionContext, next: CallHandler) {

//         const req: Request = context.switchToHttp().getRequest()
//         const publicKeyStr: string = req.header('public-key')
//         let publicKey: PublicKey
//         try {
//             publicKey = new PublicKey(publicKeyStr)
//         } catch (e) {
//             throw new Error('public-key must be a PEM RSA public key with base64 encoding')
//         }
//         return next.handle().pipe(
//             map(value => {
//                 if (typeof value !== 'string') {
//                     value = JSON.stringify(value)
//                 }
//                 return publicKey.encrypt(value)
//             })
//         )
//     }
// }