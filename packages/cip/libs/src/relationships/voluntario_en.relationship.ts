import {OmitType} from "@nestjs/swagger";
import {WithoutKey} from "@/utils/WithoutKey";
import {EstaEn} from "@/relationships/esta_en.relationship";

export class VoluntarioEn {
    id: string;
    organizacion: string
    fecha: Date
    funcion: string
    descripcion: string
    activo: boolean
}

export class VoluntarioEnWithoutId extends OmitType(VoluntarioEn, ["id"]) {
}