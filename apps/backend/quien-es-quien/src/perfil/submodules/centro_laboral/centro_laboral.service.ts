import { Injectable } from "@nestjs/common";
import { CentroLaboralActualizarInput, CentroLaboralCrearInput } from "@repo/cip-libs/dist/dtos/centro_laboral";
import { Ubicar } from "@repo/cip-libs/dist/dtos/ubicacion";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { CentroLaboral } from "@repo/cip-libs/dist/nodes";
import { UbicacionService } from "@repo/cip-services/dist/ubicacion";


@Injectable()
export class CentroLaboralService extends CRUDService {

    constructor(
        
        private readonly ubicacionService: UbicacionService
    ) {
        super(":Perfil", ":CentroLaboral")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<CentroLaboral | undefined>

    buscarTodos: (perfil_id: string) => Promise<CentroLaboral[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: CentroLaboralCrearInput): Promise<any | undefined> {
        const {trabajo_en, ...data} = input
        return [generateCreateString({
            create: {label: ":CentroLaboral", data},
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":TRABAJO_EN",
                    relations: trabajo_en
                }
            ]
        }),
            (id: string) => {
                const dto: Ubicar = {id}
                this.ubicacionService.locate(id, {})
            }]
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: CentroLaboralActualizarInput): Promise<any | undefined> {
        const {trabajo_en, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":CentroLaboral"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":TRABAJO_EN",
                    relations: trabajo_en
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<CentroLaboral | undefined>
}