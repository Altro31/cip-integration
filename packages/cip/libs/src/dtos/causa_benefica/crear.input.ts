import {VoluntarioEn, VoluntarioEnWithoutId} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";
import {TypeOf} from "zod";


export class CausaBeneficaCrearInput {

    nombre: string

    @ApiProperty({type: [VoluntarioEnWithoutId]})
    voluntario_en: VoluntarioEnWithoutId[]
}



