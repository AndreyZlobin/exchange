const { copyDir } = require("./utils/copyDir");
const { execSync } = require("child_process");

try {
  const timeStart = Date.now();

  console.log("[Server]: Build start");
  execSync("npm run server:build", { stdio: "inherit" });

  console.log("[Client]: Build start");
  execSync("npm run client:build", { stdio: "inherit" });

  console.log("[Dist]: Copy client");
  copyDir("./apps/client/dist", "./apps/server/dist");

  const res = Date.now() - timeStart;

  console.log(`[Build]: Build success with time ${(res / 1000).toFixed(2)}s`);
} catch (e) {
  console.log(e);
  process.exit(1);
}
