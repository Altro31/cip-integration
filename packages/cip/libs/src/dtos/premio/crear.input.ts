import {PremioEn, PremioEnWithoutId} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";


export class PremioCrearInput {

    nombre: string
    emisor: string
    descripcion: string

    @ApiProperty({type: [PremioEnWithoutId]})
    premio_en: PremioEnWithoutId[]
}