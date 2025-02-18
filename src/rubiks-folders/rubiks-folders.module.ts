import { Module } from "@nestjs/common"
import { RubiksFoldersService } from "./rubiks-folders.service"
import { RubiksFoldersController } from "./rubiks-folders.controller"
import { DatabaseModule } from "src/database/database.module"

@Module({
  imports: [DatabaseModule],
  providers: [RubiksFoldersService],
  controllers: [RubiksFoldersController],
})
export class RubiksFoldersModule {}
