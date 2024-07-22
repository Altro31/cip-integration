import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {CausaBeneficaActualizarInput, CausaBeneficaCrearInput} from "@repo/cip-libs/dist/dtos/causa_benefica";
import {CausaBeneficaService} from "@/perfil/submodules/causa_benefica/causa_benefica.service";
import {
    CausaBeneficaNotFoundedInterceptor
} from "@repo/cip-libs/dist/interceptors/causa_benefica_not_founded/causa_benefica_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Causa Benefica')
@Controller('perfiles/:perfil_id/causas_beneficas')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), CausaBeneficaNotFoundedInterceptor)

export class CausaBeneficaController {

    constructor(private readonly causaService: CausaBeneficaService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.causaService.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.causaService.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: CausaBeneficaCrearInput
    ) {
        return this.causaService.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: CausaBeneficaActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.causaService.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.causaService.eliminar(id)
    }

}