import { Injectable } from "@nestjs/common";
import { CentroEstudiosActualizarInput, CentroEstudiosCrearInput } from "@repo/cip-libs/dist/dtos/centro_estudios";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { CentroEstudios } from "@repo/cip-libs/dist/nodes";


@Injectable()
export class CentroEstudiosService extends CRUDService {

    constructor() {
        super(":Perfil", ":CentroEstudios")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<CentroEstudios | undefined>

    buscarTodos: (perfil_id: string) => Promise<CentroEstudios[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: CentroEstudiosCrearInput): Promise<any | undefined> {
        const {estudio_en, activista_en, ...data} = input
        return generateCreateString({
            create: {
                data,
                label: ":CentroEstudios"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":ESTUDIO_EN",
                    relations: estudio_en
                },
                {
                    id: perfil_id,
                    rel_type: ":ACTIVISTA_EN",
                    relations: activista_en
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: CentroEstudiosActualizarInput): Promise<any> {
        const {estudio_en, activista_en, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":CentroEstudios"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":ESTUDIO_EN",
                    relations: estudio_en
                },
                {
                    id: perfil_id,
                    rel_type: ":ACTIVISTA_EN",
                    relations: activista_en
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<CentroEstudios | undefined>

}
