const chalk = require("chalk"),
  moment = require("moment");

module.exports = (content, type = "log") => {
  const timestamp = `[${moment().format("DD-MM-YY HH:mm:ss")}]:`;

  switch (type.toLowerCase()) {
    case "log":
      return console.log(
        `${timestamp} ${chalk.blue(type.toUpperCase())} ${content}`
      );
    case "warn":
      return console.log(
        `${timestamp} ${chalk.yellow(type.toUpperCase())} ${content}`
      );
    case "error":
      return console.log(
        `${timestamp} ${chalk.red(type.toUpperCase())} ${content}`
      );
    case "debug":
      return console.log(
        `${timestamp} ${chalk.green(type.toUpperCase())} ${content}`
      );
    case "cmd":
      return console.log(
        `${timestamp} ${chalk.gray(type.toUpperCase())} ${content}`
      );
    case "ready":
      return console.log(
        `${timestamp} ${chalk.green(type.toUpperCase())} ${content}`
      );
    case "done":
      return console.log(
        `${timestamp} ${chalk.magenta(type.toUpperCase())} ${content}`
      );
    case "event":
      return console.log(
        `${timestamp} ${chalk.cyan(type.toUpperCase())} ${content}`
      );
    default:
      return console.log(
        `${timestamp} ${chalk.white(type.toUpperCase())} ${content}`
      );
  }
};
