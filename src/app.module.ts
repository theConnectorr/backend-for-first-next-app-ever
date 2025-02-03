import { Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { PassportModule } from "@nestjs/passport"
import { AuthController } from "./auth/auth.controller"
import { JwtModule } from "@nestjs/jwt"
import { UsersModule } from "./users/users.module"
import { RubikBattleGateWay } from "./rubik-battle/rubik-batte.gateway"
import { RubikBattleModule } from "./rubik-battle/rubik-battle.module"

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "1h",
      },
    }),
    UsersModule,
    AuthModule,
    PassportModule,
    RubikBattleModule,
  ],
  providers: [RubikBattleGateWay],
  controllers: [AuthController],
})
export class AppModule {}
