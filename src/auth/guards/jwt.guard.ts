import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const token = request.cookies["accessToken"]

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
      })

      request.user = payload
    } catch (e) {
      throw e
    }

    return true
  }
}
