import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {CentroEstudiosActualizarInput, CentroEstudiosCrearInput} from "@repo/cip-libs/dist/dtos/centro_estudios";
import {CentroEstudiosService} from "@/perfil/submodules/centro_estudios/centro_estudios.service";
import {
    CentroEstudiosNotFoundedInterceptor
} from "@repo/cip-libs/dist/interceptors/centro_estudios_not_founded/centro_estudios_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Centro de Estudios')
@Controller('perfiles/:perfil_id/centros_estudios')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), CentroEstudiosNotFoundedInterceptor)

export class CentroEstudiosController {

    constructor(private readonly centroEstudiosService: CentroEstudiosService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.centroEstudiosService.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.centroEstudiosService.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: CentroEstudiosCrearInput
    ) {
        return this.centroEstudiosService.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: CentroEstudiosActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.centroEstudiosService.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.centroEstudiosService.eliminar(id)
    }

}