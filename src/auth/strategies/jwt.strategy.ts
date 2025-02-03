import { PassportStrategy } from "@nestjs/passport"
import { Request } from "express"
import { Strategy } from "passport-jwt"

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies) return req.cookies["accessToken"]

        return null
      },
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    })
  }

  validate(payload) {
    return payload
  }
}
