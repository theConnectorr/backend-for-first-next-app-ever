import { HttpException, Inject, Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { DATABASE_CONNECTION } from "src/database/database-connection"
import { CreateRubiksSolveDto } from "src/database/dtos"
import * as schema from "src/database/schema"
import { rubiksFolders, rubiksSolves } from "src/database/schema"

@Injectable()
export class RubiksSolvesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NeonHttpDatabase<typeof schema>,
  ) {}
  async findAll() {
    const allRubiksSolves = await this.database.select().from(rubiksSolves)

    return allRubiksSolves
  }

  async findOne(id: number) {
    const [rubiksSolve] = await this.database
      .select()
      .from(rubiksSolves)
      .where(eq(rubiksSolves.id, id))

    return rubiksSolve
  }

  async createOne(createRubiksSolveDto: CreateRubiksSolveDto) {
    const { rubiksFolderId } = createRubiksSolveDto
    const [rubiksFolder] = await this.database
      .select()
      .from(rubiksFolders)
      .where(eq(rubiksFolders.id, rubiksFolderId))

    if (!rubiksFolder)
      throw new HttpException(
        { success: false, message: "Rubiks folder not found" },
        404,
      )

    const [createdRubiksSolve] = await this.database
      .insert(rubiksSolves)
      .values(createRubiksSolveDto)
      .onConflictDoNothing()
      .returning()

    return createdRubiksSolve
  }

  async updateOne(
    id: number,
    updateRubiksSolveDto: Partial<CreateRubiksSolveDto>,
  ) {
    const { rubiksFolderId } = updateRubiksSolveDto
    if (rubiksFolderId) {
      throw new HttpException(
        {
          success: false,
          message: "Invalid data",
        },
        422,
      )
    }

    const [updatedRubiksSolve] = await this.database
      .update(rubiksSolves)
      .set(updateRubiksSolveDto)
      .where(eq(rubiksSolves.id, id))
      .returning()

    return updatedRubiksSolve
  }

  async deleteOne(id: number) {
    const [deletedRubiksSolve] = await this.database
      .delete(rubiksSolves)
      .where(eq(rubiksSolves.id, id))
      .returning()

    return deletedRubiksSolve
  }
}
