import {Module} from "@nestjs/common";
import {CentroLaboralController} from "@/perfil/submodules/centro_laboral/centro_laboral.controller";
import {CentroLaboralService} from "@/perfil/submodules/centro_laboral/centro_laboral.service";
import {UbicacionModule} from "@repo/cip-services/dist/ubicacion";

@Module({
    imports: [UbicacionModule],
    exports:[CentroLaboralService],
    controllers: [CentroLaboralController],
    providers: [CentroLaboralService]
})
export class CentroLaboralModule {
}