import { Module } from "@nestjs/common";
import {MedioService} from "@app/medios/medio.service";
import {MedioController} from "@app/medios/medio.controller";
import {EmpleoModule} from "@lib/qeq_services/empleo";

@Module({
    imports: [EmpleoModule],
    controllers: [MedioController],
    providers: [MedioService]
})
export class MedioModule { }