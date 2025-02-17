import { Inject, Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { DATABASE_CONNECTION } from "src/database/database-connection"
import * as schema from "src/database/schema"
import { rubiksSolves } from "src/database/schema"

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

  // needed for a type
  async createOne(createRubiksSolveDto: any) {
    const [createdRubiksSolve] = await this.database
      .insert(rubiksSolves)
      .values(createRubiksSolveDto)
      .onConflictDoNothing()
      .returning()

    return createdRubiksSolve
  }

  // needed for a type
  async updateOne(id: number, updateRubiksSolveDto: any) {
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
