import {OmitType} from "@nestjs/swagger";

export class EstaEn {
    id: string
    usuario: string
}

export class EstaEnWithoutKey extends OmitType(EstaEn, ["id"]) {
}

