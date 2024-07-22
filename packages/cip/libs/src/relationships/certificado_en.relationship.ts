import {OmitType} from "@nestjs/swagger";

export class CertificadoEn {
    id: string
    desde: Date
    vence: string
}

export class CertificadoEnWithoutId extends OmitType(CertificadoEn, ["id"]) {
}