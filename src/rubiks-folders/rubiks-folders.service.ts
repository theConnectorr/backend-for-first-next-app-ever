import { HttpException, Inject, Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { DATABASE_CONNECTION } from "src/database/database-connection"
import * as schema from "src/database/schema"
import { users, rubiksFolders } from "src/database/schema"
import { CreateRubiksFolderDto } from "src/database/dtos"

@Injectable()
export class RubiksFoldersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NeonHttpDatabase<typeof schema>,
  ) {}

  async findAll() {
    const allRubiksFolders = await this.database.select().from(rubiksFolders)

    return allRubiksFolders
  }

  async findOne(id: number) {
    const [rubiksFolder] = await this.database
      .select()
      .from(rubiksFolders)
      .where(eq(rubiksFolders.id, id))

    return rubiksFolder
  }

  async createOne(createRubiksFolderDto: CreateRubiksFolderDto) {
    const { userId } = createRubiksFolderDto

    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (!user)
      throw new HttpException(
        { success: false, message: "User not found" },
        404,
      )

    const [createdRubiksFolder] = await this.database
      .insert(rubiksFolders)
      .values(createRubiksFolderDto)
      .onConflictDoNothing()
      .returning()

    return createdRubiksFolder
  }

  async updateOne(
    id: number,
    updateRubiksFoldersDto: Partial<CreateRubiksFolderDto>,
  ) {
    const { userId } = updateRubiksFoldersDto
    if (userId) {
      throw new HttpException(
        {
          success: false,
          message: "Invalid data",
        },
        422,
      )
    }

    const [updatedRubiksFolder] = await this.database
      .update(rubiksFolders)
      .set(updateRubiksFoldersDto)
      .where(eq(rubiksFolders.id, id))
      .returning()

    return updatedRubiksFolder
  }

  async deleteOne(id: number) {
    const [deletedRubiksFolder] = await this.database
      .delete(rubiksFolders)
      .where(eq(rubiksFolders.id, id))
      .returning()

    return deletedRubiksFolder
  }
}
