import {Module} from "@nestjs/common";
import {RedSocialController} from "@/perfil/submodules/red_social/red_social.controller";
import {RedSocialService} from "@/perfil/submodules/red_social/red_social.service";

@Module({
    exports: [RedSocialService],
    controllers: [RedSocialController],
    providers: [RedSocialService]
})
export class RedSocialModule {
}