import { Injectable } from "@nestjs/common";
import { OrganizacionActualizarInput, OrganizacionCrearInput } from "@repo/cip-libs/dist/dtos/organizacion";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { Organizacion } from "@repo/cip-libs/dist/nodes";


@Injectable()
export class OrganizacionService extends CRUDService {

    constructor() {
        super(":Perfil", ":Organizacion")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<Organizacion | undefined>

    buscarTodos: (perfil_id: string) => Promise<Organizacion[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: OrganizacionCrearInput): Promise<any | undefined> {
        const {pertenece_a, ...rest} = input
        return generateCreateString({
            create: {label: ":Organizacion", data: rest},
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":PERTENECE_A",
                    relations: pertenece_a
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: OrganizacionActualizarInput): Promise<any | undefined> {
        const {pertenece_a, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":Organizacion"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":PERTENECE_A",
                    relations: pertenece_a
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<Organizacion | undefined>
}