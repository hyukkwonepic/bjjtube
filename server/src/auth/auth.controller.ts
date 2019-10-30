import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LoginGuard } from '../common/guards/login.guard';
import { SignupGuard } from '../common/guards/signup.guard';
import { UserResponseDto } from '../user/user.dto';

@Controller()
export class AuthController {
  @UseGuards(LoginGuard)
  @Post('/login')
  login() {
    return null;
  }

  @UseGuards(SignupGuard)
  @Post('/signup')
  signup(@Request() req): UserResponseDto {
    return { user: req.user };
  }

  @Get('/logout')
  logout(@Request() req) {
    req.logout();
    return null;
  }
}
