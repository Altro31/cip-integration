import {Module} from "@nestjs/common";
import {BlogController} from "@/perfil/submodules/blog/blog.controller";
import {BlogService} from "@/perfil/submodules/blog/blog.service";

@Module({
    exports: [BlogService],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule {
}