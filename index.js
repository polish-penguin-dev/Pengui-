#! /usr/bin/env node


const { program } = require("commander");
const serve = require("./commands/serve");

program
.command("serve")
.description("Serve your html, css and javascript - with hot reload.")
.action(serve);

program.parse();