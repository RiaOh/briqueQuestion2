const net = require("net");

const server = net.createServer((client) => {
  console.log("클라이언트가 연결되었습니다.");

  client.on("data", (data) => {
    // 메시지에 따라 응답 생성
    const parsedData = JSON.parse(data);
    const message = parsedData.message;
    const id = parsedData.id;
    console.log(`Received(${id}): ${message}`);
    const response = message === "Ping" ? "Pong" : message;

    // 클라이언트에 응답 전송
    setTimeout(() => {
      client.write(response + " (" + id + ")");
    }, 3000);
    console.log(`Send: ${response} (${id})`);
  });

  client.on("end", () => {
    console.log("클라이언트가 연결을 종료했습니다.");
  });
});

const PORT = 56768;
server.listen(PORT, () => {
  console.log(`Connected by '127.0.0.1', (${PORT})`);
});
