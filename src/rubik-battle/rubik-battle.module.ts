import { Module } from "@nestjs/common"
import { RubikBattleGateWay } from "./rubik-batte.gateway"
import { AuthModule } from "src/auth/auth.module"

@Module({
  imports: [AuthModule],
  providers: [RubikBattleGateWay],
})
export class RubikBattleModule {}
