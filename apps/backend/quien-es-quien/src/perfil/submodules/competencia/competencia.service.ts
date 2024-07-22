import { Injectable } from "@nestjs/common";
import { CompetenciaActualizarInput, CompetenciaCrearInput } from "@repo/cip-libs/dist/dtos/competencia";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { Competencia } from "@repo/cip-libs/dist/nodes";


@Injectable()
export class CompetenciaService extends CRUDService {

    constructor() {
        super(":Perfil", ":Competencia")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<Competencia | undefined>

    buscarTodos: (perfil_id: string) => Promise<Competencia[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: CompetenciaCrearInput): Promise<any | undefined> {
        const {participo_en, ...rest} = input
        return generateCreateString({
            create: {label: ":Competencia", data: rest},
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":PARTICIPO_EN",
                    relations: participo_en
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: CompetenciaActualizarInput): Promise<any | undefined> {
        const {participo_en, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":Competencia"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":PARTICIPO_EN",
                    relations: participo_en
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<Competencia | undefined>
}