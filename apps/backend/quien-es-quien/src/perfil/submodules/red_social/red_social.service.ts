import { Injectable } from "@nestjs/common";
import { RedSocialActualizarInput, RedSocialCrearInput } from "@repo/cip-libs/dist/dtos/red_social";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { RedSocial } from "@repo/cip-libs/dist/nodes";


@Injectable()
export class RedSocialService extends CRUDService {

    constructor() {
        super(":Perfil", ":RedSocial")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<RedSocial | undefined>

    buscarTodos: (perfil_id: string) => Promise<RedSocial[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: RedSocialCrearInput): Promise<any | undefined> {
        const {esta_en, ...rest} = input
        return generateCreateString({
            create: {label: ":RedSocial", data: rest},
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":ESTA_EN",
                    relations: esta_en
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: RedSocialActualizarInput): Promise<any | undefined> {
        const {esta_en, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":RedSocial"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":ESTA_EN",
                    relations: esta_en
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<RedSocial | undefined>
}