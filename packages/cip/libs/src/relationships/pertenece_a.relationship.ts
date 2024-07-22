import {OmitType} from "@nestjs/swagger";

export class PerteneceA {
    id: string;
    puesto: string
    desde: Date
    activo: boolean
    nota: string

}

export class PerteneceAWithoutId extends OmitType(PerteneceA, ["id"]) {
}