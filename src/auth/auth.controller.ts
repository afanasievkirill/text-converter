import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ALREADY_REGISTERED_ERROR,
  WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginResponce } from './dto/login.responce';
import { UserModel } from './user.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Эндпоинт возвращает созданного Пользователя.',
    type: UserModel,
  })
  @ApiBody({ type: AuthDto })
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto): Promise<UserModel> {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @ApiOkResponse({
    description: 'Эндпоинт возвращает Токен.',
    type: LoginResponce,
  })
  @ApiBody({ type: AuthDto })
  @ApiUnauthorizedResponse({ description: WRONG_PASSWORD_ERROR })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
