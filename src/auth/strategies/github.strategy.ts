import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-github2"

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(protected readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>("AUTH_GITHUB_ID"),
      clientSecret: configService.getOrThrow<string>("AUTH_GITHUB_SECRET"),
      scope: ["user:email"],
      callbackURL: "http://localhost:3123/auth/github/callback",
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      id: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value,
      avatar: profile.photos?.[0]?.value,
    }
  }
}
