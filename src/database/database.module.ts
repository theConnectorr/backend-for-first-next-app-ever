import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { drizzle } from "drizzle-orm/neon-http"
import { DATABASE_CONNECTION } from "./database-connection"
import * as schema from "./schema"

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        return drizzle({
          connection: configService.getOrThrow("DATABASE_URL"),
          schema: {
            ...schema,
          },
        })
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
