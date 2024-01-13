//TCP 기반
const net = require("net");

const client = new net.Socket();

client.connect(56768, "localhost", () => {
  console.log("서버에 연결되었습니다.");

  // 사용자에게 메시지 입력 받기
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const id = 1;

  rl.question("메시지를 입력하세요: ", (message) => {
    // 메시지 전송
    const data = { message, id };
    client.write(JSON.stringify(data));
    console.log(`Send(${id}): ${message}`);
  });

  // 서버로부터 응답 수신
  client.on("data", (data) => {
    const response = data.toString();
    console.log(`Received: ${response}`);

    // 소켓 연결 종료
    client.end();
  });

  client.on("close", () => {
    console.log("서버와의 연결이 종료되었습니다.");
    rl.close();
  });
});

//1. 터미널을 켠 후, node script.js를 실행
//2. server 폴더에 진입 후, node server.js 실행
//3. 클라이언트인 script.js에서 메시지 입력
//4. 3초 후, 서버에서 response 도착
