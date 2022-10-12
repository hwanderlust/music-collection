const { CommandChecker } = require("./commands");

const prompter = ({ readline, input, output }) => {
  let instance;

  const init = () => {
    const rl = readline.createInterface({ input, output });
    instance = rl;
    const commandChecker = CommandChecker({ onQuit: quit });
    rl.on("line", (line) => {
      console.log(`Received: ${line}`);
      commandChecker.check(line);
    });
  }

  const quit = () => {
    const rl = get();
    if (rl) {
      rl.close();
      process.exit(1);
    }
  }

  const get = () => {
    if (!instance) { init(); }
    return instance;
  }

  return { init, quit }
}

module.exports = prompter;