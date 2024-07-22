import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {PerfilService} from "@/perfil/perfil.service";
import {PerfilActualizarInput, PerfilCrearInput} from "@repo/cip-libs/dist/dtos/perfil";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil')
@Controller('perfil')
export class PerfilController {

    constructor(private readonly perfilService: PerfilService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('id') id: string
    ) {
        return this.perfilService.buscarUno(id)
    }

    @Get()
    async buscarTodos() {
        return this.perfilService.buscarTodos()
    }

    @Post()
    async crear(@Body() input: PerfilCrearInput) {
        return this.perfilService.crear(input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: PerfilActualizarInput,
        @Param('id') id: string
    ) {
        return this.perfilService.actualizar(id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.perfilService.eliminar(id)
    }
}