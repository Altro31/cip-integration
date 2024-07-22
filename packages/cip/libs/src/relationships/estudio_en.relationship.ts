import {OmitType} from "@nestjs/swagger";

export class EstudioEn {
    id: string
    desde: Date
    hasta: Date
    titulo: string
    nota: number
    especialidad: string

}

export class EstudioEnWithoutId extends OmitType(EstudioEn, ["id"]) {
}