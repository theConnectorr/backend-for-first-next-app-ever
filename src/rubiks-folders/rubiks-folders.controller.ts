import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UnauthorizedException,
} from "@nestjs/common"
import { RubiksFoldersService } from "./rubiks-folders.service"
import { Response } from "express"

@Controller()
export class RubiksFoldersController {
  constructor(private readonly rubiksFoldersService: RubiksFoldersService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const allRubiksFolders = await this.rubiksFoldersService.findAll()

    res.status(200).json({
      success: true,
      data: allRubiksFolders,
    })
  }

  @Get("id")
  async findOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const rubiksFolder = await this.rubiksFoldersService.findOne(id)

    if (!rubiksFolder) {
      res.status(404).json({
        success: false,
        message: "Rubiks folder not found",
      })
    }

    res.status(200).json({
      success: true,
      data: rubiksFolder,
    })
  }

  @Post()
  async createOne(@Body() createRubiksFolderDto: any, @Res() res: Response) {
    const createdRubiksFolder = await this.rubiksFoldersService.createOne(
      createRubiksFolderDto,
    )

    if (!createdRubiksFolder) {
      res.status(409).json({
        success: false,
        message: "Data provided conflicts with the server",
      })
    }

    res.status(201).json({
      success: true,
      data: createdRubiksFolder,
    })

    throw new UnauthorizedException({})
  }

  @Put(":id")
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRubiksFoldersDto: any,
    @Res() res: Response,
  ) {
    const updatedRubiksFolder = await this.rubiksFoldersService.updateOne(
      id,
      updateRubiksFoldersDto,
    )

    if (!updatedRubiksFolder) {
      res.status(422).json({
        success: false,
        message: "Update body contains invalid data",
      })
    }

    res.status(200).json({
      success: true,
      data: updatedRubiksFolder,
    })
  }

  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const deletedRubiksFolder = await this.rubiksFoldersService.deleteOne(id)

    if (!deletedRubiksFolder) {
      res.status(404).json({
        success: false,
        message: "Rubiks folder not found",
      })
    }

    res.status(200).json({
      success: true,
      data: deletedRubiksFolder,
    })
  }
}
