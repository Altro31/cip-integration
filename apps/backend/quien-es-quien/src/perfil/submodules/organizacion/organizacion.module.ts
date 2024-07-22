import {Module} from "@nestjs/common";
import {OrganizacionService} from "@/perfil/submodules/organizacion/organizacion.service";
import {OrganizacionController} from "@/perfil/submodules/organizacion/organizacion.controller";

@Module({
    exports:[OrganizacionService],
    controllers: [OrganizacionController],
    providers: [OrganizacionService]
})
export class OrganizacionModule {
}