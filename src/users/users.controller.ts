import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { JwtGuard } from "src/auth/guards/jwt.guard"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @UseGuards(JwtGuard)
  @Get("me")
  findMe(@Req() req: any) {
    const myId = req.user.id
    return this.usersService.findOne(myId)
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    console.log("here")
    return this.usersService.findOne(id)
  }

  @Patch(":id")
  updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, updateUserDto)
  }

  @Delete(":id")
  deleteOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteOne(id)
  }
}
