import {TrabajoEnWithoutId} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";


export class CentroLaboralCrearInput {

    nombre: string
    posicion: string
    codigo_postal: string
    funcion_laboral: string
    actividades: string[]
    siglas: string[]

    @ApiProperty({type: [TrabajoEnWithoutId]})
    trabajo_en: TrabajoEnWithoutId[]
}