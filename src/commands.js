const { createEnum } = require("./utils");
const { CommandError } = require("./errors");

const COMMANDS = createEnum([
  "add", 
  "show all", 
  "show all by artist", 
  "play", 
  "show unplayed", 
  "show unplayed by artist", 
  "quit"
]);

const CommandChecker = ({ 
  onAdd, 
  onShowAll, 
  onShowAllByArtist,
  onPlay, 
  onShowUnplayed, 
  onShowUnplayedByArtist, 
  onQuit 
}) => {
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

    // TODO: remove this switch
    switch (safeInput) {
      case COMMANDS.add:
        handleOnAdd(onAdd);
        break;

      case COMMANDS["show all"]:
        handleOnShowAll(onShowAll);
        break;

      case COMMANDS["show all by artist"]:
        handleOnShowAllByArtist(onShowAllByArtist);
        break;

      case COMMANDS.play:
        handleOnPlay(onPlay);
        break;

      case COMMANDS["show unplayed"]:
        handleOnShowUnplayed(onShowUnplayed);
        break;

      case COMMANDS["show unplayed by artist"]:
        handleOnShowUnplayedByArtist(onShowUnplayedByArtist);
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

const handleOnAdd = (onAdd) => {
  if (confirmCallback(COMMANDS.add, onQuit)) {
    onAdd();
  }
}
const handleOnShowAll = (onShowAll) => {
  if (confirmCallback(COMMANDS["show all"], onShowAll)) {
    onShowAll();
  }
}
const handleOnShowAllByArtist = (onShowAllByArtist) => {
  if (confirmCallback(COMMANDS["show all by artist"], onShowAllByArtist)) {
    onShowAllByArtist();
  }
}
const handleOnPlay = (onPlay) => {
  if (confirmCallback(COMMANDS.play, onPlay)) {
    onPlay();
  }
}
const handleOnShowUnplayed = (onShowUnplayed) => {
  if (confirmCallback(COMMANDS["show unplayed"], onShowUnplayed)) {
    onShowUnplayed();
  }
}
const handleOnShowUnplayedByArtist = (onShowUnplayedByArtist) => {
  if (confirmCallback(COMMANDS["show unplayed by artist"], onShowUnplayedByArtist)) {
    onShowUnplayedByArtist();
  }
}
const handleOnQuit = (onQuit) => {
  if (confirmCallback(COMMANDS.quit, onQuit)) {
    onQuit();
  }
}

module.exports = { CommandChecker };