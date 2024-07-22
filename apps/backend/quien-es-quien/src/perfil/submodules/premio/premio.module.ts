import {Module} from "@nestjs/common";
import {PremioService} from "@/perfil/submodules/premio/premio.service";
import {PremioController} from "@/perfil/submodules/premio/premio.controller";

@Module({
    exports:[PremioService],
    controllers: [PremioController],
    providers: [PremioService]
})
export class PremioModule {
}