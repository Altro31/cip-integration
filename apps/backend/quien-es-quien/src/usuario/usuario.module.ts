import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PerfilModule } from "@/perfil/perfil.module";
import { UsuarioRepository } from './usuario.repository';

@Module({
    imports: [
        //PerfilModule
    ],
    providers: [UsuarioService, UsuarioRepository],
    controllers: [UsuarioController]
})
export class UsuarioModule {
}
