import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {CompetenciaActualizarInput, CompetenciaCrearInput} from "@repo/cip-libs/dist/dtos/competencia";
import {CompetenciaService} from "@/perfil/submodules/competencia/competencia.service";
import {
    CompetenciaNotFoundedInterceptor
} from "@repo/cip-libs/dist/interceptors/competencia_not_founded/competencia_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Competencia')
@Controller('perfiles/:perfil_id/competencia')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), CompetenciaNotFoundedInterceptor)

export class CompetenciaController {

    constructor(private readonly competenciaervice: CompetenciaService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.competenciaervice.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.competenciaervice.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: CompetenciaCrearInput
    ) {
        return this.competenciaervice.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: CompetenciaActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.competenciaervice.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.competenciaervice.eliminar(id)
    }

}