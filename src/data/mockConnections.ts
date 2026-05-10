import { Connection } from "@/types/connection";

export const MOCK_CONNECTIONS: Connection[] = [
  { id: "c1", userId: "u1", status: "shinyu", connectedAt: "2025-01-10T00:00:00Z" },
  { id: "c2", userId: "u3", status: "shinyu", connectedAt: "2025-01-15T00:00:00Z" },
  { id: "c3", userId: "u2", status: "talking", connectedAt: "2025-02-01T00:00:00Z" },
  { id: "c4", userId: "u5", status: "interested", connectedAt: "2025-02-10T00:00:00Z" },
  { id: "c5", userId: "u8", status: "interested", connectedAt: "2025-03-01T00:00:00Z" },
];
