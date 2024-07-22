import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {CentroLaboralActualizarInput, CentroLaboralCrearInput} from "@repo/cip-libs/dist/dtos/centro_laboral";
import {CentroLaboralService} from "@/perfil/submodules/centro_laboral/centro_laboral.service";
import {
    CentroLaboralNotFoundedInterceptor
} from "@repo/cip-libs/dist/interceptors/centro_laboral_not_founded/centro_laboral_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Centro Laboral')
@Controller('perfiles/:perfil_id/centro_laboral')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'),CentroLaboralNotFoundedInterceptor)
export class CentroLaboralController {

    constructor(private readonly centrolaboralService: CentroLaboralService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.centrolaboralService.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.centrolaboralService.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: CentroLaboralCrearInput
    ) {
        return this.centrolaboralService.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: CentroLaboralActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.centrolaboralService.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.centrolaboralService.eliminar(id)
    }

}