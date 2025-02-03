import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets"
import { AuthService } from "src/auth/auth.service"
import { Server, WebSocket } from "ws"

@WebSocketGateway(80, {
  path: "/rubik-battle",
})
export class RubikBattleGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server

  clients = new Map()

  notifyUserIn() {}

  handleConnection(client: WebSocket) {
    this.clients.set(client, this.clients.size + 1)

    client.send("connected to websocket server successfully")
  }

  handleDisconnect(client: WebSocket) {
    console.log("client disconnected")
    this.clients.delete(client)
  }

  @SubscribeMessage("authorize")
  handleAuthorize(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() message: string,
  ) {}

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
}
