import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UsersModule } from "src/users/users.module"
import { GithubStrategy, GoogleStrategy } from "./strategies"
import { LocalGuard } from "./guards"
import { DatabaseModule } from "src/database/database.module"
import { RefreshGuard } from "./guards/refresh.guard"

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    GithubStrategy,
    AuthService,
    LocalGuard,
    RefreshGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
