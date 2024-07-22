import {Module} from "@nestjs/common";
import {CentroEstudiosController} from "@/perfil/submodules/centro_estudios/centro_estudios.controller";
import {CentroEstudiosService} from "@/perfil/submodules/centro_estudios/centro_estudios.service";

@Module({
    exports:[CentroEstudiosService],
    controllers: [CentroEstudiosController],
    providers: [CentroEstudiosService]
})
export class CentroEstudiosModule {
}