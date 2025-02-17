import { Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { PassportModule } from "@nestjs/passport"
import { AuthController } from "./auth/auth.controller"
import { JwtModule } from "@nestjs/jwt"
import { UsersModule } from "./users/users.module"
import { RubikBattleModule } from "./rubik-battle/rubik-battle.module"
import { DatabaseModule } from "./database/database.module"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    JwtModule.register({
      global: true,
    }),
    UsersModule,
    AuthModule,
    PassportModule,
    DatabaseModule,
    // RubikBattleModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
