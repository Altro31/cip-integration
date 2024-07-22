import {OmitType} from "@nestjs/swagger";

export class PremioEn {
    id: string;
    fecha: Date

}

export class PremioEnWithoutId extends OmitType(PremioEn, ["id"]) {
}