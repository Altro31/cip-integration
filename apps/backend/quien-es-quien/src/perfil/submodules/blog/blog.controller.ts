import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from "@nestjs/common"
import {BlogNotFoundedInterceptor, DoPerfilExistsInterceptor} from "@repo/cip-libs/dist/interceptors";
import {BlogActualizarInput, BlogCrearInput} from "@repo/cip-libs/dist/dtos/blog";
import {BlogService} from '@/perfil/submodules/blog/blog.service'
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Perfil/Blogs')
@Controller('perfiles/:perfil_id/blogs')
@UseInterceptors(DoPerfilExistsInterceptor('perfil_id'), BlogNotFoundedInterceptor)

export class BlogController {

    constructor(private readonly blogService: BlogService) {
    }

    @Get(':id')
    async buscarUno(
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.blogService.buscarUno(perfil_id, id)
    }

    @Get()
    async buscarTodos(@Param('perfil_id') perfil_id: string) {
        return this.blogService.buscarTodos(perfil_id)
    }

    @Post()
    async crear(
        @Param('perfil_id') perfil_id: string,
        @Body() input: BlogCrearInput
    ) {
        return this.blogService.crear(perfil_id, input)
    }

    @Patch(':id')
    async actualizar(
        @Body() input: BlogActualizarInput,
        @Param('perfil_id') perfil_id: string,
        @Param('id') id: string
    ) {
        return this.blogService.actualizar(perfil_id, id, input)
    }

    @Delete(':id')
    async eliminar(
        @Param('id') id: string
    ) {
        return this.blogService.eliminar(id)
    }

}