import {EstaEn, EstaEnWithoutKey, UbicadoEn} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";


export class RedSocialCrearInput {

    nombre: string
    url: string

    @ApiProperty({type: [EstaEnWithoutKey]})
    esta_en: EstaEnWithoutKey[]

}