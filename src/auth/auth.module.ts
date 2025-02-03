import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UsersModule } from "src/users/users.module"
import { GithubStrategy, GoogleStrategy, JwtStrategy } from "./strategies"
import { LocalGuard } from "./guards"

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    GithubStrategy,
    AuthService,
    JwtStrategy,
    LocalGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
