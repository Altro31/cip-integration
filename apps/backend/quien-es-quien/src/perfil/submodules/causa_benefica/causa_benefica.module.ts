import {Module} from "@nestjs/common";
import {CausaBeneficaController} from "@/perfil/submodules/causa_benefica/causa_benefica.controller";
import {CausaBeneficaService} from "@/perfil/submodules/causa_benefica/causa_benefica.service";

@Module({
    exports:[CausaBeneficaService],
    controllers: [CausaBeneficaController],
    providers: [CausaBeneficaService]
})
export class CausaBeneficaModule {
}