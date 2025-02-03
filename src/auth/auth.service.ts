import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "src/users/users.service"

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async sign(email: string): Promise<string> {
    const user = this.usersService.findOneByEmail(email)
    if (!user) throw new UnauthorizedException("User not found")

    const { id, roles } = user

    return this.jwtService.signAsync({
      id,
      email,
      roles,
    })
  }
}
