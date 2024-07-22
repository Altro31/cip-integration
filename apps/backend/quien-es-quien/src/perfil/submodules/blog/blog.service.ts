
import { Injectable } from "@nestjs/common";
import { BlogActualizarInput, BlogCrearInput } from "@repo/cip-libs/dist/dtos/blog";
import { CRUDService, generateCreateString, generateUpdateString, Mutation } from "@repo/cip-libs/dist/neo4j";
import { Blog } from "@repo/cip-libs/dist/nodes";

const neo = {} as any

@Injectable()
export class BlogService extends CRUDService {

    constructor() {
        super(":Perfil", ":Blog")
    }

    buscarUno: (perfil_id: string, id: string) => Promise<Blog | undefined>

    buscarTodos: (perfil_id: string) => Promise<Blog[] | undefined>

    @Mutation
    async crear(perfil_id: string, input: BlogCrearInput): Promise<any | undefined> {
        const {tiene_un, ...rest} = input
        return generateCreateString({
            create: {label: ":Blog", data: rest},
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":TIENE_UN",
                    relations: tiene_un
                }
            ]
        })
    }

    @Mutation
    async actualizar(perfil_id: string, id: string, input: BlogActualizarInput): Promise<any | undefined> {
        const {tiene_un, ...data} = input
        return generateUpdateString({
            update: {
                id,
                data,
                label: ":Blog"
            },
            parents: [
                {
                    id: perfil_id,
                    rel_type: ":TIENE_UN",
                    relations: tiene_un
                }
            ]
        })
    }

    eliminar: (id: string) => Promise<Blog | undefined>
}