import fastify from "fastify";
const server = fastify();

import { deploy, message } from "./";

server.get("/", (request, reply) => {
  reply.code(200).send({ deployer: "ready" });
});
server.get("/favicon.ico", (request, reply) => {
  reply.code(200).send();
});

server.get("/:command/:password", (request, reply) => {
  if (request.params.password != <string>process.env.PASSWORD) {
    reply.code(401).send({ deployer: "error:invalid-password" });
  } else {
    reply.code(200).send({ deployer: "deploying" });
    deploy(request.params.command)
      .then(() => {})
      .catch(() => {
        message("@ceo", `Error in deploying: ${request.params.command}`);
      });
  }
});

server.listen(7004, (error, address) => {
  if (error) throw new Error(error.message);
});
