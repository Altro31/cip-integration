import { Injectable } from "@nestjs/common";
import { ProyectoActualizarInput, ProyectoCrearInput } from "@repo/cip-libs/dist/dtos/proyecto";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { Proyecto } from "@repo/cip-libs/dist/nodes";


@Injectable()
export class ProyectoService extends CRUDService {

    constructor() {
        super(":Perfil", ":Proyecto")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<Proyecto | undefined>

    buscarTodos: (perfil_id: string) => Promise<Proyecto[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: ProyectoCrearInput): Promise<any | undefined> {
        const {formo_parte_de, ...rest} = input
        return generateCreateString({
            create: {label: ":Proyecto", data: rest},
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":FORMO_PARTE_DE",
                    relations: formo_parte_de
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: ProyectoActualizarInput): Promise<any | undefined> {
        const {formo_parte_de, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":Proyecto"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":FORMO_PARTE_DE",
                    relations: formo_parte_de
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<Proyecto | undefined>
}