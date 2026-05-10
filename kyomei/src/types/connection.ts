export type ConnectionStatus = "shinyu" | "talking" | "interested";

export interface Connection {
  id: string;
  userId: string;
  status: ConnectionStatus;
  connectedAt: string;
}
