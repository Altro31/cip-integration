import {ParticipoEn, ParticipoEnWithoutId} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";


export class CompetenciaCrearInput {

    nombre: string
    idioma: string

    @ApiProperty({type: [ParticipoEnWithoutId]})
    participo_en: ParticipoEnWithoutId[]

}

