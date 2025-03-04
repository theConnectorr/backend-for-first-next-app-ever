import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UnauthorizedException,
} from "@nestjs/common"
import { RubiksFoldersService } from "./rubiks-folders.service"
import { Response } from "express"
import { CreateRubiksFolderDto } from "src/database/dtos"

@Controller("rubiks-folders")
export class RubiksFoldersController {
  constructor(private readonly rubiksFoldersService: RubiksFoldersService) {}

  @Get()
  async findAll(@Query() query: any, @Res() res: Response) {
    const allRubiksFolders = await this.rubiksFoldersService.findAll(query)

    res.status(200).json({
      success: true,
      data: allRubiksFolders,
    })
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const rubiksFolder = await this.rubiksFoldersService.findOne(id)

    if (!rubiksFolder) {
      throw new HttpException(
        {
          success: false,
          message: "Rubiks folder not found",
        },
        404,
      )
    }

    res.status(200).json({
      success: true,
      data: rubiksFolder,
    })
  }

  @Post()
  async createOne(
    @Body() createRubiksFolderDto: CreateRubiksFolderDto,
    @Res() res: Response,
  ) {
    const newRubiksFolder = await this.rubiksFoldersService.createOne(
      createRubiksFolderDto,
    )

    if (!newRubiksFolder)
      throw new HttpException(
        {
          success: false,
          message: "Data provided conflicts with the server",
        },
        409,
      )

    res.status(201).json({
      success: true,
      data: newRubiksFolder,
    })
  }

  @Patch(":id")
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRubiksFoldersDto: Partial<CreateRubiksFolderDto>,
    @Res() res: Response,
  ) {
    const updatedRubiksFolder = await this.rubiksFoldersService.updateOne(
      id,
      updateRubiksFoldersDto,
    )

    if (!updatedRubiksFolder)
      throw new HttpException(
        {
          success: false,
          message: "Folder not found",
        },
        404,
      )

    res.status(200).json({
      success: true,
      data: updatedRubiksFolder,
    })
  }

  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const deletedRubiksFolder = await this.rubiksFoldersService.deleteOne(id)

    if (!deletedRubiksFolder) {
      throw new HttpException(
        {
          success: false,
          message: "Rubiks folder not found",
        },
        404,
      )
    }

    res.status(200).json({
      success: true,
      data: deletedRubiksFolder,
    })
  }
}
