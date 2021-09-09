import ws from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const subscriptionServer = new ws.Server({ port: 8181, path: "/graphql" });
