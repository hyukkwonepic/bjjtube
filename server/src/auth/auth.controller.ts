import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LoginGuard } from '../common/guards/login.guard';

@Controller()
export class AuthController {
  @UseGuards(LoginGuard)
  @Post('/login')
  login() {
    return null;
  }

  @Get('/logout')
  logout(@Request() req) {
    req.logout();
    return null;
  }
}
