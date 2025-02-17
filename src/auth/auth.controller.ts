import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { AuthService } from "./auth.service"
import { Response } from "express"
import { LocalGuard } from "./guards/local.guard"
import { ConfigService } from "@nestjs/config"
import { RefreshGuard } from "./guards/refresh.guard"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get("login/github")
  @UseGuards(AuthGuard("github"))
  githubLogin() {}

  @Get("github/callback")
  @UseGuards(AuthGuard("github"))
  async githubCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email }: { email: string } = req.user
    const { accessToken, refreshToken } = await this.authService.sign({
      userEmail: email,
    })

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: this.configService.getOrThrow<number>("ACCESS_TOKEN_MAX_AGE"),
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: this.configService.getOrThrow<number>("REFRESH_TOKEN_MAX_AGE"),
    })

    res.redirect("http://localhost:3000")
  }

  @Get("login/google")
  @UseGuards(AuthGuard("google"))
  googleLogin() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email }: { email: string } = req.user
    const { accessToken, refreshToken } = await this.authService.sign({
      userEmail: email,
    })

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: this.configService.getOrThrow<number>("ACCESS_TOKEN_MAX_AGE"),
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: this.configService.getOrThrow<number>("REFRESH_TOKEN_MAX_AGE"),
    })
    res.redirect("http://localhost:3000")
  }

  @UseGuards(LocalGuard)
  @Post("login/credentials")
  async credentialsLogin(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email }: { email: string } = req.user
    const { accessToken, refreshToken } = await this.authService.sign({
      userEmail: email,
    })

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: this.configService.getOrThrow<number>("ACCESS_TOKEN_MAX_AGE"),
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: this.configService.getOrThrow<number>("REFRESH_TOKEN_MAX_AGE"),
      path: "/auth/refresh",
    })
  }

  @UseGuards(RefreshGuard)
  @Get("refresh")
  async refreshAccessToken(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id }: { id: number } = req.user
    const { accessToken } = await this.authService.newAccessToken({
      userId: id,
    })

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: this.configService.getOrThrow<number>("ACCESS_TOKEN_MAX_AGE"),
    })
  }
}
