import { Injectable } from "@nestjs/common";
import { CertificacionActualizarInput, CertificacionCrearInput } from "@repo/cip-libs/dist/dtos/certificacion";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { Certificacion } from "@repo/cip-libs/dist/nodes";


@Injectable()
export class CertificacionService extends CRUDService {

    constructor() {
        super(":Perfil", ":Certificacion")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<Certificacion | undefined>

    buscarTodos: (perfil_id: string) => Promise<Certificacion[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: CertificacionCrearInput): Promise<any | undefined> {
        const {certificado_en, ...data} = input
        return generateCreateString({
            create: {label: ":Certificacion", data},
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":CERTIFICADO_DE",
                    relations: certificado_en
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: CertificacionActualizarInput): Promise<any | undefined> {
        const {certificado_en, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":Certificacion"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":CERTIFICADO_DE",
                    relations: certificado_en
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<Certificacion | undefined>
}