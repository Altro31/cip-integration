import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {RedSocialActualizarInput, RedSocialCrearInput} from "@repo/cip-libs/dist/dtos/red_social";
import {RedSocialService} from "@/perfil/submodules/red_social/red_social.service";
import {
    RedSocialNotFoundedInterceptor
} from "@repo/cip-libs/dist/interceptors/red_social_not_founded/red_social_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Red Social')
@Controller('perfiles/:perfil_id/red_social')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), RedSocialNotFoundedInterceptor)
export class RedSocialController {

    constructor(private readonly causaService: RedSocialService) {
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
        @Body() input: RedSocialCrearInput
    ) {
        return this.causaService.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: RedSocialActualizarInput,
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