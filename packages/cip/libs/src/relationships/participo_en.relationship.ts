import {OmitType} from "@nestjs/swagger";

export class ParticipoEn {
    id: string
    fecha: Date
}

export class ParticipoEnWithoutId extends OmitType(ParticipoEn, ["id"]) {
}
