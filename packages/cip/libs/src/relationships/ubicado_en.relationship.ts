import {OmitType} from "@nestjs/swagger";

export class UbicadoEn {
    id: string
    desde: Date
}

export class UbicadoEnWithoutId extends OmitType(UbicadoEn, ["id"]) {
}