const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const pc = require("picocolors");
const chokidar = require("chokidar");

function serve() {
  const serveDir = process.cwd();

  function setUpServer(x) {
  app.get("*", (req, res) => {
    const filePath = path.join(serveDir, req.path);

    if (!fs.existsSync(filePath)) {
        return res.status(404).end();
    }

    if (fs.statSync(filePath).isDirectory()) {
        const filesInDir = fs.readdirSync(filePath);
       
      return res.send(filesInDir);
    } else {
        const fileContent = fs.readFileSync(filePath, "utf8");

      return res.send(fileContent);
    }
  });

  const port = 3000;

  const server = app.listen(port, () => {
    if(x) {
    console.log(pc.blue("Assuming index.html is root, listening at: http://localhost:3000/index.html/."));
    } else {
      console.log(pc.yellow("File change detected! Restarting..."))
    }
  });
}

  //listen for file changes within the working directory.

  const watcher = chokidar.watch(process.cwd());

  watcher.on("change", () => {
    server.close().then(
      setUpServer()
    );
  });

  setUpServer("foobar");
}

module.exports = serve;