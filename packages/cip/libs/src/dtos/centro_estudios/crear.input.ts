import {ActivistaEn, ActivistaEnWithoutId, EstudioEn, EstudioEnWithoutId} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";


export class CentroEstudiosCrearInput {

    nombre: string

    descripcion: string

    @ApiProperty({type: [EstudioEnWithoutId]})
    estudio_en: EstudioEnWithoutId[]

    @ApiProperty({type: [ActivistaEnWithoutId]})
    activista_en: ActivistaEnWithoutId[]


}