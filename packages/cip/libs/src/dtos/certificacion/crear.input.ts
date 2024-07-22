import {CertificadoEn, CertificadoEnWithoutId} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";


export class CertificacionCrearInput {

    nombre: string
    numero_licencia: string
    emisor: string
    url: string

    @ApiProperty({type: [CertificadoEnWithoutId]})
    certificado_en: CertificadoEnWithoutId[]

}