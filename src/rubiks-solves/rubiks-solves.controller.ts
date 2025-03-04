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
  Query,
  Res,
} from "@nestjs/common"
import { RubiksSolvesService } from "./rubiks-solves.service"
import { Response } from "express"
import { CreateRubiksSolveDto } from "src/database/dtos"

@Controller("rubiks-solves")
export class RubiksSolvesController {
  constructor(private readonly rubiksSolvesService: RubiksSolvesService) {}

  @Get()
  async findAll(@Query() query: any, @Res() res: Response) {
    const allRubiksSolves = await this.rubiksSolvesService.findAll(query)

    res.status(200).json({
      success: true,
      data: allRubiksSolves,
    })
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const rubiksSolve = await this.rubiksSolvesService.findOne(id)

    if (!rubiksSolve) {
      throw new HttpException(
        {
          success: false,
          message: "Rubiks solve not found",
        },
        404,
      )
    }

    res.status(200).json({
      success: true,
      data: rubiksSolve,
    })
  }

  @Post()
  async createOne(
    @Body() createRubiksSolveDto: CreateRubiksSolveDto,
    @Res() res: Response,
  ) {
    const newRubiksSolve =
      await this.rubiksSolvesService.createOne(createRubiksSolveDto)

    if (!newRubiksSolve)
      throw new HttpException(
        {
          success: false,
          message: "Data provided conflicts with the server",
        },
        409,
      )

    res.status(201).json({
      success: true,
      data: newRubiksSolve,
    })
  }

  @Patch(":id")
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body()
    updateRubiksSolveDto: Partial<CreateRubiksSolveDto>,
    @Res() res: Response,
  ) {
    const updatedRubiksSolve = await this.rubiksSolvesService.updateOne(
      id,
      updateRubiksSolveDto,
    )

    if (!updateRubiksSolveDto)
      throw new HttpException(
        {
          success: false,
          message: "Rubiks solve not found",
        },
        404,
      )

    res.status(200).json({
      success: true,
      data: updatedRubiksSolve,
    })
  }

  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const deletedRubiksSolve = await this.rubiksSolvesService.deleteOne(id)

    if (!deletedRubiksSolve) {
      throw new HttpException(
        {
          success: false,
          message: "Rubiks solve not found",
        },
        404,
      )
    }

    res.status(200).json({
      success: true,
      data: deletedRubiksSolve,
    })
  }
}
