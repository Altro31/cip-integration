import {ActivistaEn, EstudioEn} from "@/relationships";

export class CentroEstudiosActualizarInput {

    nombre: string

    descripcion: string

    estudio_en: EstudioEn[]

    activista_en: ActivistaEn[]

}