import { Module } from "@nestjs/common"
import { RubikBattleGateWay } from "./rubik-batte.gateway"

@Module({
  providers: [RubikBattleGateWay],
})
export class RubikBattleModule {}
