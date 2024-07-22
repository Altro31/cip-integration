// import {NextFunction, Request, Response} from "express";
// import {Injectable, NestMiddleware} from "@nestjs/common";
// import {PublicKeyService} from "../services/publickey.service";

// @Injectable()
// export class PublicKeyMiddleware implements NestMiddleware {

//     constructor(private readonly publicKeyService: PublicKeyService) {
//     }

//     use(req: Request, res: Response, next: NextFunction): any {
//         const publicKeyStr: string = req.header('public-key')
//         if (!publicKeyStr) throw new Error('A public-key must be provided via headers')
//         const encryptedData = req.body.data
//         if (!encryptedData) throw new Error('Data must be provided via body')
//         req.body.data = this.publicKeyService.privateKey.decrypt(encryptedData)
//         next()
//     }
// }