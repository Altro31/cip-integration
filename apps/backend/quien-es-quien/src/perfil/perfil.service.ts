import { BlogService } from "@/perfil/submodules/blog/blog.service";
import { CausaBeneficaService } from "@/perfil/submodules/causa_benefica/causa_benefica.service";
import { CentroEstudiosService } from "@/perfil/submodules/centro_estudios/centro_estudios.service";
import { CentroLaboralService } from "@/perfil/submodules/centro_laboral/centro_laboral.service";
import { CertificacionService } from "@/perfil/submodules/certificacion/certificacion.service";
import { CompetenciaService } from "@/perfil/submodules/competencia/competencia.service";
import { OrganizacionService } from "@/perfil/submodules/organizacion/organizacion.service";
import { PremioService } from "@/perfil/submodules/premio/premio.service";
import { ProyectoService } from "@/perfil/submodules/proyecto/proyecto.service";
import { RedSocialService } from "@/perfil/submodules/red_social/red_social.service";
import { Injectable } from "@nestjs/common";
import { PerfilActualizarInput, PerfilCrearInput } from "@repo/cip-libs/dist/dtos/perfil";
import { Node } from "@repo/cip-libs/dist/interfaces/neo4j";
import { toActualizarData, toCrearData } from "@repo/cip-libs/dist/neo4j";
import {
    Blog,
    CausaBenefica,
    CentroEstudios,
    CentroLaboral,
    Certificacion,
    Competencia, Organizacion,
    Perfil, Premio, Proyecto, RedSocial
} from "@repo/cip-libs/dist/nodes";

const neo = {} as any

@Injectable()
export class PerfilService {

    constructor(
        // private readonly blogService: BlogService,
        // private readonly causaBeneficaService: CausaBeneficaService,
        // private readonly centroEstudiosService: CentroEstudiosService,
        // private readonly centroLaboralService: CentroLaboralService,
        // private readonly certificacionService: CertificacionService,
        // private readonly competenciaService: CompetenciaService,
        // private readonly organizacionService: OrganizacionService,
        // private readonly premioService: PremioService,
        // private readonly proyectoService: ProyectoService,
        // private readonly redSocialService: RedSocialService
    ) {
    }

    async buscarUno(id: string): Promise<Perfil> {
        const query = `
            MATCH (u:Perfil)
            WHERE elementId(u)='${id}'
            RETURN u
        `
        const res = await neo.read(query)
        const node: Node<Perfil> = res.records[0]?.get('u')
        return node && { ...node.properties, id: node.elementId }
    }

    async buscarTodos(): Promise<Perfil[]> {
        const query = `
            MATCH (u:Perfil)
            RETURN collect(u) AS u
        `
        const res = await neo.read(query)
        const nodes: Node<Perfil>[] = res.records[0]?.get('u')
        return nodes.map(node => ({
            ...node.properties,
            id: node.elementId
        }))
    }

    async crear(
        {
            blogs, centros_laborales, causas_beneficas,
            centro_estudios, certificaciones, competencias,
            organizaciones, premios, proyectos,
            redes_sociales, ...input
        }: PerfilCrearInput
    ) {
        const input_str = toCrearData(input)
        const query = `
            CREATE (u:Perfil { ${input_str} })
            RETURN u
        `
        const res = await neo.write(query)
        const user_node: Node<Perfil> = res.records[0]?.get('u')
        if (!user_node) return null;
        const perfil_id = user_node.elementId

        const pendingBlogs: Promise<Blog>[] = blogs.map(blog => this.blogService.crear(perfil_id, blog))
        const pendingCentrosLaborales: Promise<CentroLaboral>[] = centros_laborales.map(centro_laboral => this.centroLaboralService.crear(perfil_id, centro_laboral))
        const pendingCausaBenefica: Promise<CausaBenefica>[] = causas_beneficas.map(causa_benefica => this.causaBeneficaService.crear(perfil_id, causa_benefica))
        const pendingCentroEstudios: Promise<CentroEstudios>[] = centro_estudios.map(centro_estudio => this.centroEstudiosService.crear(perfil_id, centro_estudio))
        const pendingCertificacion: Promise<Certificacion>[] = certificaciones.map(certificacion => this.certificacionService.crear(perfil_id, certificacion))
        const pendingCompetencia: Promise<Competencia>[] = competencias.map(competencia => this.competenciaService.crear(perfil_id, competencia))
        const pendingOrganizacion: Promise<Organizacion>[] = organizaciones.map(organizacion => this.organizacionService.crear(perfil_id, organizacion))
        const pendingPremio: Promise<Premio>[] = premios.map(premio => this.premioService.crear(perfil_id, premio))
        const pendingProyecto: Promise<Proyecto>[] = proyectos.map(proyecto => this.proyectoService.crear(perfil_id, proyecto))
        const pendingRedSocial: Promise<RedSocial>[] = redes_sociales.map(red_social => this.redSocialService.crear(perfil_id, red_social))


        return user_node && {
            ...user_node.properties,
            id: user_node.elementId,
            createdBlogs: await Promise.all(pendingBlogs),
            createdCentrosLaborales: await Promise.all(pendingCentrosLaborales),
            createdCausasBeneficas: await Promise.all(pendingCausaBenefica),
            createdCentrosEstudios: await Promise.all(pendingCentroEstudios),
            createdCertificaciones: await Promise.all(pendingCertificacion),
            createdCompetencias: await Promise.all(pendingCompetencia),
            createdOrganizaciones: await Promise.all(pendingOrganizacion),
            createdPremios: await Promise.all(pendingPremio),
            createdProyectos: await Promise.all(pendingProyecto),
            createdRedesSociales: await Promise.all(pendingRedSocial)
        }
    }

    async actualizar(id: string, input: PerfilActualizarInput) {
        const input_str = toActualizarData(input)
        const query = `
            MATCH (u:Perfil)
            WHERE elementId(u)=$id
            SET ${input_str}
            RETURN u
        `
        const res = await neo.write(query, { id })
        const node: Node<Perfil> = res.records[0]?.get('u')

        return node && {
            ...node.properties,
            id: node.elementId
        }
    }

    async eliminar(id: string) {
        const query = `
            MATCH (u:Perfil)
            WHERE elementId(u)=$id
            DETACH DELETE u
            RETURN u
        `
        const res = await neo.write(query, { id })
        const node: Node<Perfil> = res.records[0]?.get('u')

        return node && {
            ...node.properties,
            id: node.elementId
        }
    }
}