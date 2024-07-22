import {ApiProperty, OmitType} from "@nestjs/swagger";
import {UbicadoEnWithoutId} from "@/relationships/ubicado_en.relationship";

export class TrabajoEn {
    id: string;
    desde: Date
    hasta: Date

    @ApiProperty({type: UbicadoEnWithoutId})
    ubicado_en: UbicadoEnWithoutId
}

export class TrabajoEnWithoutId extends OmitType(TrabajoEn, ["id"]) {
}