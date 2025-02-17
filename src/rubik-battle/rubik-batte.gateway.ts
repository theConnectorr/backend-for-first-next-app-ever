import { OnModuleDestroy } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets"
import { Server, WebSocket } from "ws"

@WebSocketGateway({
  path: "/rubik-battle",
})
export class RubikBattleGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly jwtService: JwtService) {}

  @WebSocketServer()
  server: Server

  clients = new Map()

  notifyUserIn() {}

  handleConnection(client: WebSocket) {
    client.send("connecting... waiting for authorization")
  }

  handleDisconnect(client: WebSocket) {}

  @SubscribeMessage("authorize")
  handleAuthorize(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() message: { accessToken: string },
  ) {
    const { accessToken } = message

    const payload = this.jwtService.verify(accessToken, {
      secret: process.env.JWT_SECRET,
    })
  }

  @SubscribeMessage("request-battle")
  handleRequestBattle(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() message: string,
  ) {}

  @SubscribeMessage("accept-battle")
  handleAcceptBattle(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() message: string,
  ) {}

  @SubscribeMessage("update-solve-time")
  handleUpdateSolveTime(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() message: string,
  ) {}

  @SubscribeMessage("finish-solve")
  handleFinishSolve(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() message: string,
  ) {}
}

class RubikBattleClient extends WebSocket {
  status: "connecting" | "connected" | "offline"
  email: string
}
