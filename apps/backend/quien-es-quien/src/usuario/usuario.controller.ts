import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsuarioService } from "@/usuario/usuario.service";
import { ActualizarInput, CrearInput } from "@repo/cip-libs/dist/dtos/usuario";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('id') id: string
    ) {
        return this.usuarioService.buscarUno(id)
    }

    @Get()
    async buscarTodos() {
        return this.usuarioService.buscarTodos()
    }

    @Post()
    async crear(@Body() input: CrearInput) {
        return this.usuarioService.crear(input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: ActualizarInput,
        @Param('id') id: string
    ) {
        return this.usuarioService.actualizar(id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.usuarioService.eliminar(id)
    }
}
