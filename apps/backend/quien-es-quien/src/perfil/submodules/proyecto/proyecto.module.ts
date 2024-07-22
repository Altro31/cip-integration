import {Module} from "@nestjs/common";
import {ProyectoService} from "@/perfil/submodules/proyecto/proyecto.service";
import {ProyectoController} from "@/perfil/submodules/proyecto/proyecto.controller";

@Module({
    exports:[ProyectoService],
    controllers: [ProyectoController],
    providers: [ProyectoService]
})
export class ProyectoModule {
}