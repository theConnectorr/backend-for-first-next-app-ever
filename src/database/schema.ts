import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial().primaryKey(),
  email: varchar({ length: 128 }).unique(),
  roles: varchar({ length: 128 }).array(),
  password: text(),
})

export const rubiksFolders = pgTable("rubiksFolders", {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }),
  userId: integer()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
})

export const rubiksSolves = pgTable("rubiksSolves", {
  id: serial().primaryKey(),
  solveTime: integer(),
  cubeType: varchar({ length: 128 }),
  scramble: varchar({ length: 128 }),
  when: timestamp().defaultNow(),
  rubiksFolderId: integer()
    .references(() => rubiksFolders.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
})

export const refreshTokens = pgTable("refreshTokens", {
  id: serial().primaryKey(),
  userId: integer()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: text(),
})

// export const users_rubiksFolders = relations(users, ({ many }) => ({
//   rubiksFolders: many(rubiksFolders),
// }))

// export const rubiksFolders_users = relations(rubiksFolders, ({ one }) => ({
//   user: one(users, {
//     fields: [rubiksFolders.userId],
//     references: [users.id],
//   }),
// }))

// export const rubiksFolders_rubiksSolves = relations(
//   rubiksFolders,
//   ({ many }) => ({
//     rubiksSolves: many(rubiksSolves),
//   }),
// )

// export const rubiksSolves_rubiksFolders = relations(
//   rubiksSolves,
//   ({ one }) => ({
//     folder: one(rubiksFolders, {
//       fields: [rubiksSolves.rubiksFolderId],
//       references: [rubiksFolders.id],
//     }),
//   }),
// )
