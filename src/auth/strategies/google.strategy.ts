import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-google-oauth20"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(protected readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>("AUTH_GOOGLE_ID"),
      clientSecret: configService.getOrThrow<string>("AUTH_GOOGLE_SECRET"),
      callbackURL: "http://localhost:3123/auth/google/callback",
      scope: ["email", "profile"],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { name, emails, photos } = profile

    return {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    }
  }
}
