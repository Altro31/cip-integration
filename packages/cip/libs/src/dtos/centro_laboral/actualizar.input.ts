import {TrabajoEn} from "@/relationships";

export class CentroLaboralActualizarInput {

    nombre: string
    posicion: string
    codigo_postal: string
    funcion_laboral: string
    actividades: string[]
    siglas: string[]

    trabajo_en: TrabajoEn[]

}