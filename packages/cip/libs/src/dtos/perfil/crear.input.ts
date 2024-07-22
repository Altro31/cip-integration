import {VoluntarioEn} from "@/relationships";
import {ApiExtraModels, ApiProperty} from "@nestjs/swagger";
import {BlogCrearInput} from "@/dtos/blog";
import {CausaBeneficaCrearInput} from "@/dtos/causa_benefica";
import {CentroEstudiosCrearInput} from "@/dtos/centro_estudios";
import {CentroLaboralCrearInput} from "@/dtos/centro_laboral";
import {CertificacionCrearInput} from "@/dtos/certificacion";
import {CompetenciaCrearInput} from "@/dtos/competencia";
import {OrganizacionCrearInput} from "@/dtos/organizacion";
import {PremioCrearInput} from "@/dtos/premio";
import {ProyectoCrearInput} from "@/dtos/proyecto";
import {RedSocialCrearInput} from "@/dtos/red_social";

@ApiExtraModels(VoluntarioEn)
export class PerfilCrearInput {

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

    sexo: string

    @ApiProperty({type: [BlogCrearInput]})
    blogs?: BlogCrearInput[]

    @ApiProperty({type: [CausaBeneficaCrearInput]})
    causas_beneficas?: CausaBeneficaCrearInput[]

    @ApiProperty({type: [CentroEstudiosCrearInput]})
    centro_estudios?: CentroEstudiosCrearInput[]

    @ApiProperty({type: [CentroLaboralCrearInput]})
    centros_laborales?: CentroLaboralCrearInput[]

    @ApiProperty({type: [CertificacionCrearInput]})
    certificaciones?: CertificacionCrearInput[]

    @ApiProperty({type: [CompetenciaCrearInput]})
    competencias?: CompetenciaCrearInput[]

    @ApiProperty({type: [OrganizacionCrearInput]})
    organizaciones?: OrganizacionCrearInput[]

    @ApiProperty({type: [PremioCrearInput]})
    premios?: PremioCrearInput[]

    @ApiProperty({type: [ProyectoCrearInput]})
    proyectos?: ProyectoCrearInput[]

    @ApiProperty({type: [RedSocialCrearInput]})
    redes_sociales?: RedSocialCrearInput[]

}