import {TieneUn} from "@/relationships/tiene_un.relationship";
import {ApiProperty} from "@nestjs/swagger";
import {BlogActualizarInput, BlogCrearInput} from "@/dtos/blog";
import {CausaBeneficaActualizarInput} from "@/dtos/causa_benefica";
import {CentroEstudiosActualizarInput} from "@/dtos/centro_estudios";
import {CentroLaboralActualizarInput} from "@/dtos/centro_laboral";
import {CertificacionActualizarInput} from "@/dtos/certificacion";
import {CompetenciaActualizarInput} from "@/dtos/competencia";
import {OrganizacionActualizarInput} from "@/dtos/organizacion";
import {PremioActualizarInput} from "@/dtos/premio";
import {ProyectoActualizarInput} from "@/dtos/proyecto";
import {RedSocialActualizarInput} from "@/dtos/red_social";

export class PerfilActualizarInput {

    nombre: string
    sudonimo: string
    extracto: string
    activo: boolean
    nacionalidad: string
    curriculum: string
    categoria_cientifica: string
    nivel_academico: string
    categoria_docente: string
    telefono: string
    estado_civil: string
    sexo?: string

    @ApiProperty({type: [BlogActualizarInput]})
    blogs?: BlogActualizarInput[]

    @ApiProperty({type: [CausaBeneficaActualizarInput]})
    causas_beneficas?: [CausaBeneficaActualizarInput]

    @ApiProperty({type: [CentroEstudiosActualizarInput]})
    centro_estudios?: CentroEstudiosActualizarInput[]

    @ApiProperty({type: [CentroLaboralActualizarInput]})
    centros_laborales?: CentroLaboralActualizarInput[]

    @ApiProperty({type: [CertificacionActualizarInput]})
    certificaciones?: CertificacionActualizarInput[]

    @ApiProperty({type: [CompetenciaActualizarInput]})
    competencias?: CompetenciaActualizarInput[]

    @ApiProperty({type: [OrganizacionActualizarInput]})
    organizaciones?: OrganizacionActualizarInput[]

    @ApiProperty({type: [PremioActualizarInput]})
    premios?: PremioActualizarInput[]

    @ApiProperty({type: [ProyectoActualizarInput]})
    proyectos?: ProyectoActualizarInput[]

    @ApiProperty({type: [RedSocialActualizarInput]})
    redes_sociales?: RedSocialActualizarInput[]

}