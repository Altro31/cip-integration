import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {ProyectoActualizarInput, ProyectoCrearInput} from "@repo/cip-libs/dist/dtos/proyecto";
import {ProyectoService} from "@/perfil/submodules/proyecto/proyecto.service";
import {
    ProyectoNotFoundedInterceptor
} from "@repo/cip-libs/dist/interceptors/proyecto_not_founded/proyecto_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Proyecto')
@Controller('perfiles/:perfil_id/proyecto')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), ProyectoNotFoundedInterceptor)

export class ProyectoController {

    constructor(private readonly proyectoervice: ProyectoService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.proyectoervice.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.proyectoervice.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: ProyectoCrearInput
    ) {
        return this.proyectoervice.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: ProyectoActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.proyectoervice.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.proyectoervice.eliminar(id)
    }

}