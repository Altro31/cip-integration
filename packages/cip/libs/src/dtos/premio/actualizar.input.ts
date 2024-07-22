import {PremioEn} from "@/relationships";

export class PremioActualizarInput {

    nombre: string
    emisor: string
    descripcion: string

    premio_en: PremioEn[]

}