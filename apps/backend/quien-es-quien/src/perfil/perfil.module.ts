import { PerfilController } from "@/perfil/perfil.controller";
import { PerfilService } from "@/perfil/perfil.service";
import { BlogModule } from "@/perfil/submodules/blog/blog.module";
import { CausaBeneficaModule } from "@/perfil/submodules/causa_benefica/causa_benefica.module";
import { CentroEstudiosModule } from "@/perfil/submodules/centro_estudios/centro_estudios.module";
import { CentroLaboralModule } from "@/perfil/submodules/centro_laboral/centro_laboral.module";
import { CertificacionModule } from "@/perfil/submodules/certificacion/certificacion.module";
import { CompetenciaModule } from "@/perfil/submodules/competencia/competencia.module";
import { OrganizacionModule } from "@/perfil/submodules/organizacion/organizacion.module";
import { PremioModule } from "@/perfil/submodules/premio/premio.module";
import { ProyectoModule } from "@/perfil/submodules/proyecto/proyecto.module";
import { RedSocialModule } from "@/perfil/submodules/red_social/red_social.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        // BlogModule,
        // CausaBeneficaModule,
        // CentroEstudiosModule,
        // CentroLaboralModule,
        // CertificacionModule,
        // CompetenciaModule,
        // OrganizacionModule,
        // PremioModule,
        // ProyectoModule,
        // RedSocialModule
    ],
    exports: [PerfilService],
    providers: [PerfilService],
    controllers: [PerfilController]
})
export class PerfilModule {
}

