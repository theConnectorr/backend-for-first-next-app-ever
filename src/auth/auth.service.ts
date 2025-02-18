import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { DATABASE_CONNECTION } from "src/database/database-connection"
import { UsersService } from "src/users/users.service"
import * as schema from "src/database/schema"
import { refreshTokens } from "src/database/schema"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NeonHttpDatabase<typeof schema>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async sign({
    userId,
    userEmail,
  }: {
    userId?: number
    userEmail?: string
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const user = userEmail
      ? await this.usersService.findOneByEmail(userEmail)
      : userId
        ? await this.usersService.findOne(userId)
        : undefined

    if (!user) throw new NotFoundException("User not found")

    const { id, email, roles } = user

    const tokens = {
      accessToken: this.jwtService.sign(
        { id, email, roles },
        {
          secret: this.configService.getOrThrow<string>("ACCESS_TOKEN_SECRET"),
          expiresIn: this.configService.getOrThrow<number>(
            "ACCESS_TOKEN_MAX_AGE",
          ),
        },
      ),
      refreshToken: this.jwtService.sign(
        { id },
        {
          secret: this.configService.getOrThrow<string>("REFRESH_TOKEN_SECRET"),
          expiresIn: this.configService.getOrThrow<number>(
            "REFRESH_TOKEN_MAX_AGE",
          ),
        },
      ),
    }

    await this.database.insert(refreshTokens).values({
      userId: id,
      token: tokens.refreshToken,
    })

    return tokens
  }

  async newAccessToken({
    userId,
    userEmail,
  }: {
    userId?: number
    userEmail?: string
  }): Promise<{ accessToken: string }> {
    const user = userEmail
      ? await this.usersService.findOneByEmail(userEmail)
      : userId
        ? await this.usersService.findOne(userId)
        : undefined

    if (!user) throw new NotFoundException("User not found")

    const { id, email, roles } = user

    return {
      accessToken: this.jwtService.sign(
        { id, email, roles },
        {
          secret: this.configService.getOrThrow<string>("ACCESS_TOKEN_SECRET"),
          expiresIn: this.configService.getOrThrow<number>(
            "ACCESS_TOKEN_MAX_AGE",
          ),
        },
      ),
    }
  }
}
