import { Body, Controller, HttpCode, Get, Post, UseGuards, Inject, UseInterceptors, Header, Headers } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local_auth.guard";
import { CurrentUser } from "./param_decorators/current_user.param_decorator";
import { UserWithoutPassword } from "./entities/user_without_password.entity";
import { JWTAuthGuard } from "./guards/jwt_auth.guard";
import { RequiredPipe } from "./pipes/required.pipe";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpCacheInterceptor } from './interceptors/http-cache.interceptor';
import { Cache } from 'cache-manager';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {
    }

    @ApiBody({ type: LoginDto, description: 'Login with email and password' })
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login(@CurrentUser() user: UserWithoutPassword) {
        return { token: await this.authService.login(user) }
    }

    @ApiBody({ type: RegisterDto, description: 'Register with email, username and password' })
    @HttpCode(200)
    @Post('register')
    async register(
        @Body('email', RequiredPipe) email: string,
        @Body('name', RequiredPipe) name: string,
        @Body('password', RequiredPipe) password: string
    ) {
        return { token: await this.authService.register(email, name, password) }
    }

    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @UseInterceptors(HttpCacheInterceptor)
    @HttpCode(200)
    @Get('verify')
    async verify(
        @CurrentUser() user: UserWithoutPassword,
    ) {
        return { user }
    }

    @ApiBody({ type: ChangePasswordDto, description: 'Change password' })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @HttpCode(200)
    @Post('change-password')
    async change_password(
        @CurrentUser() user: UserWithoutPassword,
        @Body('prev_password', RequiredPipe) prev_pw: string,
        @Body('new_password', RequiredPipe) new_pw: string,
    ) {
        this.cacheManager.del(user.email)
        return { user: await this.authService.change_password(user.email, prev_pw, new_pw) }
    }
}
