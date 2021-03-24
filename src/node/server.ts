const http = require("http");
const server = http.createServer((request, response) => {
  if (request.url === "/hello") {
    response.writeHead(200, {
      "Content-Type": "text/plains",
    });
    response.end("hello world!");
  } else {
    response.end("Ok");
  }
});

server.listen(4000, "127.0.0.1", () => {
  console.log("service is listening ");
});
