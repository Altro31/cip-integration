import {Module} from "@nestjs/common";
import {CertificacionService} from "@/perfil/submodules/certificacion/certificacion.service";
import {CertificacionController} from "@/perfil/submodules/certificacion/certificacion.controller";

@Module({
    exports:[CertificacionService],
    controllers: [CertificacionController],
    providers: [CertificacionService]
})
export class CertificacionModule {
}