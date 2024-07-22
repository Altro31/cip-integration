import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {CertificacionActualizarInput, CertificacionCrearInput} from "@repo/cip-libs/dist/dtos/certificacion";
import {CertificacionService} from "@/perfil/submodules/certificacion/certificacion.service";
import {
    CertificacionNotFoundedInterceptor
} from "@repo/cip-libs/dist/interceptors/certificacion_not_founded/certificacion_not_founded.interceptor";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Certificacion')
@Controller('perfiles/:perfil_id/certificacion')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), CertificacionNotFoundedInterceptor)

export class CertificacionController {

    constructor(private readonly certificacionervice: CertificacionService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.certificacionervice.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.certificacionervice.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: CertificacionCrearInput
    ) {
        return this.certificacionervice.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: CertificacionActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.certificacionervice.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.certificacionervice.eliminar(id)
    }

}