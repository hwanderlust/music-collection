const { createEnum } = require("./utils");
const { CommandError } = require("./errors");

const COMMANDS = createEnum(["add", "show all", "play", "show unplayed", "quit"]);

const CommandChecker = ({ onAdd, onShowAll, onPlay, onShowUnplayed, onQuit }) => {
  const check = (input) => {
    console.log(`check:`, input);
    
    if (!input || typeof input !== "string") {
      throw CommandError(`${input} isn't a string.`, input);
    }

    relayCommand(input);
  }

  const relayCommand = (input) => {
    const safeInput = input.trim().toLowerCase();
    console.log(`relay:`, safeInput);

    switch (safeInput) {
      case COMMANDS.add:
        break;
      case COMMANDS["show all"]:
        break;
      case COMMANDS.play:
        break;
      case COMMANDS["show unplayed"]:
        break;

      case COMMANDS.quit:
        handleOnQuit(onQuit);
        break;
      
      default:
        throw CommandError(`'${input}' not supported.`, input);
    }
  }

  return {
    check,
  }
}

const confirmCallback = (name, arg) => {
  if (!arg) {
    console.warn(`${name} callback is missing from Command Checker.`);
    return false;
  }
  if (typeof arg !== "function") {
    console.warn(`${name} isn't a function for Command Checker.`);
    return false;
  }
  return true;
}

const handleOnQuit = (onQuit) => {
  if (confirmCallback(COMMANDS.quit, onQuit)) {
    onQuit();
  }
}

module.exports = { CommandChecker };