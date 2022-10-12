const { CommandChecker } = require("./commands");
const { PrompterError } = require("./errors");

const prompter = ({ readline, input, output }) => {
  let instance;

  const init = () => {
    const rl = readline.createInterface({ input, output });
    instance = rl;
    const commandChecker = CommandChecker({ onQuit: quit });
    
    rl.on("line", (line) => {
      try {
        console.log(`Received: ${line}`);
        commandChecker.check(line);
      } catch (error) {
        console.error(PrompterError(`Processing line failed.`, error));
        quit();
        return;
      }
    });
  }

  const quit = () => {
    const rl = get();
    if (!rl) {
      throw PrompterError(`Missing Readline instance.`, rl);
    }
    rl.close();
    process.exit(1);
  }

  const get = () => {
    if (!instance) { init(); }
    return instance;
  }

  return { init, quit }
}

module.exports = prompter;