import { Controller, Post, HttpStatus, HttpCode, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthTokenDto } from './dto/index';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async createToken(@Body() createAuthTokenDto: CreateAuthTokenDto) {
    return await this.authService.createToken(createAuthTokenDto);
  }

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }
}
