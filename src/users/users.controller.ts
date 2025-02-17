import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { JwtGuard } from "src/auth/guards/jwt.guard"
import { CreateUserDto } from "./dtos/create-user.dto"
import { Response } from "express"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const allUsers = await this.usersService.findAll()

    res.status(200).json({
      success: true,
      data: allUsers,
    })
  }

  @UseGuards(JwtGuard)
  @Get("me")
  async findMe(@Req() req: any, @Res() res: Response) {
    const myId = req.user.id
    const thisUser = await this.usersService.findOne(myId)

    res.status(200).json({
      success: true,
      data: thisUser,
    })
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const thisUser = await this.usersService.findOne(id)

    res.status(200).json({
      success: true,
      data: thisUser,
    })
  }

  @Post()
  async createOne(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const newUser = await this.usersService.createOne(createUserDto)

    if (!newUser) {
      res.status(409).json({
        success: false,
        message: "Data provided conflicts with the server",
      })
    }

    res.status(200).json({
      success: true,
      data: newUser,
    })
  }

  @Patch(":id")
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.updateOne(id, updateUserDto)

    res.status(200).json({
      success: true,
      data: updatedUser,
    })
  }

  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const deletedUser = await this.usersService.deleteOne(id)

    res.status(200).json({
      success: true,
      data: deletedUser,
    })
  }
}
