import {OmitType} from "@nestjs/swagger";

export class ActivistaEn {
    id: string
    ocupacion: string
    desde: string
    hasta: string
}

export class ActivistaEnWithoutId extends OmitType(ActivistaEn, ["id"]) {
}