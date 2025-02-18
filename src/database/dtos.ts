import { users, rubiksFolders, rubiksSolves } from "./schema"

export type CreateUserDto = typeof users.$inferInsert
export type CreateRubiksFolderDto = typeof rubiksFolders.$inferInsert
export type CreateRubiksSolveDto = typeof rubiksSolves.$inferInsert
