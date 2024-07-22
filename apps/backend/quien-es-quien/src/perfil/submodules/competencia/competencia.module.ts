import {Module} from "@nestjs/common";
import {CompetenciaService} from "@/perfil/submodules/competencia/competencia.service";
import {CompetenciaController} from "@/perfil/submodules/competencia/competencia.controller";

@Module({
    exports:[CompetenciaService],
    controllers: [CompetenciaController],
    providers: [CompetenciaService]
})
export class CompetenciaModule {
}