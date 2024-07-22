import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {OrganizacionActualizarInput, OrganizacionCrearInput} from "@repo/cip-libs/dist/dtos/organizacion";
import {OrganizacionService} from "@/perfil/submodules/organizacion/organizacion.service";
import {
    OrganizacionNotFoundedInterceptor
} from "@repo/cip-libs/dist/interceptors/organizacion_not_founded/organizacion_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Organizacion')
@Controller('perfiles/:perfil_id/organizacion')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), OrganizacionNotFoundedInterceptor)

export class OrganizacionController {

    constructor(private readonly organizacionervice: OrganizacionService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.organizacionervice.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.organizacionervice.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: OrganizacionCrearInput
    ) {
        return this.organizacionervice.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: OrganizacionActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.organizacionervice.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.organizacionervice.eliminar(id)
    }

}