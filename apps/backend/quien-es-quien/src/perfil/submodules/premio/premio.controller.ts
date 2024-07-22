import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {PremioActualizarInput, PremioCrearInput} from "@repo/cip-libs/dist/dtos/premio";
import {PremioService} from "@/perfil/submodules/premio/premio.service";
import {PremioNotFoundedInterceptor} from "@repo/cip-libs/dist/interceptors/premio_not_founded/premio_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Premio')
@Controller('perfiles/:perfil_id/premio')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), PremioNotFoundedInterceptor)

export class PremioController {

    constructor(private readonly premioervice: PremioService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.premioervice.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.premioervice.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: PremioCrearInput
    ) {
        return this.premioervice.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: PremioActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.premioervice.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.premioervice.eliminar(id)
    }

}