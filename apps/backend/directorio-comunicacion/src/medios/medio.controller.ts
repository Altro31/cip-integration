import { Controller, Get, Put, Delete, Post, Param, Body } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { MedioService } from "@app/medios/medio.service";
import { MedioDTO, PublishDTO } from "@lib/qeq_lib/dtos/medios";

@ApiTags('Medios')
@Controller('medio')
export class MedioController {

    constructor(private medioService: MedioService) {
    }

    @Get()
    getAll() {
        return this.medioService.getAll()
    }

    @Get(":id")
    getById(
        @Param('id') id: string,
    ) {
        return this.medioService.getByID(id)
    }

    @Put(":id")
    updateMedia(
        @Param('id') id: string,
        @Body() input: MedioDTO
    ) {
        return this.medioService.updateMedia(id, input)
    }

    @Delete(":id")
    deleteByID(
        @Param('id') id: string,
    ) {
        return this.medioService.deleteByID(id)
    }

    @ApiBody({ type: MedioDTO })
    @Post()
    insertMedia(@Body() input: MedioDTO) {
        return this.medioService.insertMedia(input)
    }

    @Post(':id/associate/:other')
    assosiateMedia(
        @Param('id') id: string,
        @Param('other') other: string
    ) {
        return this.medioService.assosiateMedia(id, other)
    }

    @Post(':id/publish')
    publishFile(
        @Param('id') id: string,
        @Body() input: PublishDTO
    ) {
        return this.medioService.publishFile(id, input)
    }

    @Post('offer-job')
    offerJob(
        @Param('id') id: string,
        @Body() data
    ) {
        return this.medioService.offerJob(id, data)
    }

}