import {CertificadoEn} from "@/relationships";

export class CertificacionActualizarInput {

    nombre: string
    numero_licencia: string
    emisor: string
    url: string

    certificado_en: CertificadoEn[]

}