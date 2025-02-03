import * as dotenv from "dotenv"
import { resolve } from "path"
dotenv.config({ path: resolve(__dirname, "../.env") })

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigModule } from "@nestjs/config"
import * as cookieParser from "cookie-parser"
import * as cors from "cors"
import { WsAdapter } from "@nestjs/platform-ws"

ConfigModule.forRoot()

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  )

  app.useWebSocketAdapter(new WsAdapter(app))
  app.use(cookieParser())

  await app.listen(3123)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
