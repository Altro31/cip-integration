import {PerfilService} from "@/perfil/perfil.service";
import {Injectable} from '@nestjs/common';
import {ActualizarInput, CrearInput} from "@repo/cip-libs/dist/dtos/usuario";
import {UsuarioRepository} from "./usuario.repository";
import {Perfil} from "graphql/types-generated";

const neo = {} as any

@Injectable()
export class UsuarioService {
    constructor(
        private readonly perfilService: PerfilService,
        private readonly usuarioRepository: UsuarioRepository
    ) {
    }

    buscarUno(id: string) {
        return this.usuarioRepository.buscarUno(id)
    }

    buscarTodos() {
        return this.usuarioRepository.buscarTodos()
    }

    async crear(input: CrearInput) {

        const perfil: Perfil = await this.perfilService.crear()
        return this.usuarioRepository.crear({
            ...input,
            perfil
        })
    }

    async actualizar(id: string, input: ActualizarInput) {

        const usuario = await this.usuarioRepository.actualizar(id, input)

        usuario.perfil = await this.perfilService(
            usuario.perfil.id,
            input
        )
        return usuario
    }

    eliminar(id: string) {
        return this.usuarioRepository.eliminar(id)
    }
}
