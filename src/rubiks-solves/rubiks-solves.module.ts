import { Module } from "@nestjs/common"
import { RubiksSolvesController } from "./rubiks-solves.controller"
import { RubiksSolvesService } from "./rubiks-solves.service"
import { DatabaseModule } from "src/database/database.module"

@Module({
  imports: [DatabaseModule],
  controllers: [RubiksSolvesController],
  providers: [RubiksSolvesService],
})
export class RubiksSolvesModule {}
