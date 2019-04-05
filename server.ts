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
    deploy(request.params.command)
      .then(() => reply.code(200).send({ deployer: "success" }))
      .catch(() => {
        message("@ceo", `Error in deploying: ${request.params.command}`);
        reply.code(500).send({ deployer: "error" });
      });
  }
});

server.listen(7004, (error, address) => {
  if (error) throw new Error(error.message);
  console.log(`Deployer listening on ${address}`);
});
