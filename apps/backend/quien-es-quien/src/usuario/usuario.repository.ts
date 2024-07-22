import { GraphqlService } from "@/graphql/graphql.service";
import { Injectable } from "@nestjs/common";
import { UsuarioCreateInput, UsuarioModel, UsuarioUpdateInput } from "graphql/types-generated";

@Injectable()
export class UsuarioRepository {

    private readonly model: UsuarioModel

    constructor(readonly gql: GraphqlService) {
        this.model = gql.model('Usuario')
    }

    async buscarUno(id: string) {

        const usuarios = await this.model.find({
            where: { id },
            options: { limit: 1 },
        })
        return usuarios.at(0)
    }

    buscarTodos() {
        return this.model.find()
    }

    crear(input: UsuarioCreateInput) {
        return this.model.create({
            input: [{
                ...input,
                perfil: { connect: { where: { node: { id: input.perfil.id } } } }
            }]
        })
    }

    async actualizar(id: string, input: UsuarioUpdateInput) {

        const res = await this.model.update({
            where: { id },
            update: input
        })

        return res.usuarios[0]
    }

    eliminar(id: string) {
        return this.model.delete({ where: { id } })
    }
}