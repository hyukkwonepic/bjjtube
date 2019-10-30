import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { UserResponseDto } from './user.dto';

@Controller()
export class UserController {
  @UseGuards(AuthGuard)
  @Get('/me')
  me(@Request() req): UserResponseDto {
    return { user: req.user };
  }
}
