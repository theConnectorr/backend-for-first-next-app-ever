import { Inject, Injectable } from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { DATABASE_CONNECTION } from "src/database/database-connection"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import * as schema from "src/database/schema"
import { users } from "src/database/schema"
import { eq } from "drizzle-orm"

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NeonHttpDatabase<typeof schema>,
  ) {}

  async findAll() {
    const allUsers = await this.database.select().from(users)
    return allUsers
  }

  async findOne(id: number) {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    return user
  }

  async findOneByEmail(email: string) {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return user
  }

  async createOne(createUserDto: CreateUserDto) {
    const [newUser] = await this.database
      .insert(users)
      .values(createUserDto)
      .onConflictDoNothing()
      .returning()

    return newUser
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const [updatedUser] = await this.database
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, id))
      .returning()

    return updatedUser
  }

  async deleteOne(id: number) {
    const [deletedUser] = await this.database
      .delete(users)
      .where(eq(users.id, id))
      .returning()

    return deletedUser
  }
}
