import { Injectable } from "@nestjs/common";
import { PremioActualizarInput, PremioCrearInput } from "@repo/cip-libs/dist/dtos/premio";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { Premio } from "@repo/cip-libs/dist/nodes";


@Injectable()
export class PremioService extends CRUDService {

    constructor() {
        super(":Perfil", ":Premio")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<Premio | undefined>

    buscarTodos: (perfil_id: string) => Promise<Premio[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: PremioCrearInput): Promise<any | undefined> {
        const {premio_en, ...rest} = input
        return generateCreateString({
            create: {label: ":Premio", data: rest},
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":PREMIO_EN",
                    relations: premio_en
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: PremioActualizarInput): Promise<any | undefined> {
        const {premio_en, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":Premio"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":PREMIO_EN",
                    relations: premio_en
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<Premio | undefined>
}