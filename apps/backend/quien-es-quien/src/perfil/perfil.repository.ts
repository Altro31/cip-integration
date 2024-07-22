import { Injectable } from "@nestjs/common";
import {PerfilModel, UsuarioCreateInput, UsuarioUpdateInput} from "../../graphql/types-generated";
import {GraphqlService} from "@/graphql/graphql.service";

@Injectable()
export class PerfilRepository {

    private readonly model: PerfilModel

    constructor(readonly graphqlService: GraphqlService) {
        this.model = graphqlService.model("Perfil")
    }

    async buscarUno(id: string) {

        const perfiles = await this.model.find({
            where: { id },
            options: { limit: 1 },
        })
        return perfiles.at(0)
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