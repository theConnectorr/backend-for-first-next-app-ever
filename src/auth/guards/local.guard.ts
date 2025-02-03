import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { UsersService } from "src/users/users.service"

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const { email, password } = request.body

    const user = this.usersService.findOneByEmail(email)

    if (user === undefined)
      throw new UnauthorizedException("Credentials not match")

    if (user.password !== password)
      throw new UnauthorizedException("Credentials not match")

    request.user = {
      email,
      roles: user.roles,
      id: user.id,
    }

    return true
  }
}
