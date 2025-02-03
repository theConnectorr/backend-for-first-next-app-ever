import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { AuthService } from "./auth.service"
import { Request, Response } from "express"
import { LocalGuard } from "./guards/local.guard"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("login/github")
  @UseGuards(AuthGuard("github"))
  githubLogin() {}

  @Get("github/callback")
  @UseGuards(AuthGuard("github"))
  async githubCallback(
    @Req() req, // needed for a type
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email }: { email: string } = req.user
    const accessToken = await this.authService.sign(email)

    res.cookie("accessToken", accessToken)
    res.redirect("http://localhost:3000")
  }

  @Get("login/google")
  @UseGuards(AuthGuard("google"))
  googleLogin() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(
    @Req() req, // needed for a type
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email }: { email: string } = req.user
    const accessToken = await this.authService.sign(email)

    res.cookie("accessToken", accessToken)
    res.redirect("http://localhost:3000")
  }

  @UseGuards(LocalGuard)
  @Post("login/credentials")
  async credentialsLogin(
    @Req() req, // needed for a type
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email }: { email: string } = req.user
    const accessToken = await this.authService.sign(email)

    res.cookie("accessToken", accessToken)
  }
}
