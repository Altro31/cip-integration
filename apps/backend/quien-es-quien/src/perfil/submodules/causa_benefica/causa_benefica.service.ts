import { Injectable } from "@nestjs/common";
import { CausaBeneficaActualizarInput, CausaBeneficaCrearInput } from "@repo/cip-libs/dist/dtos/causa_benefica";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { CausaBenefica } from "@repo/cip-libs/dist/nodes";

const neo = {} as any

@Injectable()
export class CausaBeneficaService extends CRUDService {

    constructor() {
        super(":Perfil", ":CausaBenefica")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<CausaBenefica | undefined>

    buscarTodos: (perfil_id: string) => Promise<CausaBenefica[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: CausaBeneficaCrearInput): Promise<any | undefined> {
        const {voluntario_en, ...data} = input
        return generateCreateString({
            create: {
                data,
                label: ":CausaBenefica"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":VOLUNTARIO_EN",
                    relations: voluntario_en
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: CausaBeneficaActualizarInput): Promise<any> {
        const {voluntario_en, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":CausaBenefica"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ':VOLUNTARIO_EN',
                    relations: voluntario_en
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<CausaBenefica | undefined>

}
