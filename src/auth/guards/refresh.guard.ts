import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService, TokenExpiredError } from "@nestjs/jwt"
import { eq } from "drizzle-orm"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { DATABASE_CONNECTION } from "src/database/database-connection"
import * as schema from "src/database/schema"

export class RefreshGuard implements CanActivate {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NeonHttpDatabase<typeof schema>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const refreshToken = request.cookies["refreshToken"]

    const [storedRefreshToken] = await this.database
      .select({ token: schema.refreshTokens.token })
      .from(schema.refreshTokens)
      .where(eq(schema.refreshTokens.token, refreshToken))

    if (!storedRefreshToken) {
      throw new ForbiddenException()
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.getOrThrow<string>("REFRESH_TOKEN_SECRET"),
        ignoreExpiration: false,
      })
      request.user = { id: payload.id }
      return true
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        await this.database
          .delete(schema.refreshTokens)
          .where(eq(schema.refreshTokens.token, storedRefreshToken.token))
      }

      throw new ForbiddenException("Invalid refresh token")
    }
  }
}
