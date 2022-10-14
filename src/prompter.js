const { PrompterError } = require("./errors");
const { sendSingleMessage } = require("./utils");

const prompter = ({ readline, input, output }) => {
  let instance;

  const init = (commandChecker) => {
    const rl = readline.createInterface({ input, output });
    instance = rl;

    greet();

    rl.on("line", (line) => {
      try {
        commandChecker.check(line);
      } catch (error) {
        console.error(PrompterError(`Processing line failed.`, error));
        return;
      }
    });
  };

  const quit = () => {
    const rl = get();
    if (!rl) {
      throw PrompterError(`Missing Readline instance.`, rl);
    }
    sendSingleMessage("Bye!");
    rl.close();
    process.exit(1);
  };

  const get = () => {
    if (!instance) {
      init();
    }
    return instance;
  };

  return { init, quit };
};

const greet = () => {
  console.log(`Welcome to your music collection!\n`);
  console.log(`Available actions are:`);
  console.log(`- add "album title" by "artist name"`);
  console.log(`- show all`);
  console.log(`- show all by "artist name"`);
  console.log(`- play "album title"`);
  console.log(`- show unplayed`);
  console.log(`- show unplayed by "artist name"`);
  console.log(`- quit\n`);
};

module.exports = prompter;
