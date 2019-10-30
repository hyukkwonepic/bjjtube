import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy, LocalSignupStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    AuthService,
    LocalStrategy,
    LocalSignupStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
