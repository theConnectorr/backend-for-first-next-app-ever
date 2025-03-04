import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial().primaryKey().notNull(),
  email: varchar({ length: 128 }).unique().notNull(),
  roles: varchar({ length: 128 }).array().notNull(),
  password: text().notNull(),
})

export const rubiksFolders = pgTable("rubiksFolders", {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 128 }).notNull(),
  userId: integer()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
})

export const rubiksSolves = pgTable("rubiksSolves", {
  id: serial().primaryKey().notNull(),
  solveTime: integer().notNull(),
  cubeType: varchar({ length: 128 }).notNull(),
  scramble: varchar({ length: 128 }).notNull(),
  penalty: varchar({ length: 128 }).notNull(),
  when: timestamp().defaultNow(),
  rubiksFolderId: integer()
    .references(() => rubiksFolders.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
})

export const refreshTokens = pgTable("refreshTokens", {
  userId: integer()
    .references(() => users.id, { onDelete: "cascade" })
    .primaryKey()
    .notNull(),
  token: text().notNull(),
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
