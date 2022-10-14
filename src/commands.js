const { createEnum, getQuotes } = require("./utils");
const { CommandError } = require("./errors");

const COMMANDS = createEnum([
  "add",
  "show all",
  "show all by artist",
  "play",
  "show unplayed",
  "show unplayed by artist",
  "quit",
]);

const COMMAND_ERRORS = {
  missingCallback: (name) =>
    `${name} callback is missing from Command Checker.`,
  missingData: (input) =>
    `Cannot complete "${input}". Missing data. Maybe quotation marks are missing?`,
  notAString: (input) => `${input} isn't a string.`,
  notFunction: (name) => `${name} isn't a function for Command Checker.`,
  unsupportedAction: (input) => `'${input}' not supported.`,
};

const CommandChecker = ({
  onAdd,
  onShowAll,
  onShowAllByArtist,
  onPlay,
  onShowUnplayed,
  onShowUnplayedByArtist,
  onQuit,
}) => {
  const check = (input) => {
    if (!input || typeof input !== "string") {
      throw CommandError(COMMAND_ERRORS.notAString(input), input);
    }
    relayCommand(input);
  };

  // TODO: move outside of CommandChecker
  const relayCommand = (input) => {
    const safeInput = input.trim().toLowerCase();

    if (safeInput.startsWith("add")) {
      handleOnAdd(input, onAdd);
      return;
    }
    if (safeInput.startsWith("show all by")) {
      handleOnShowAllByArtist(input, onShowAllByArtist);
      return;
    }
    if (safeInput.startsWith("show unplayed by")) {
      handleOnShowUnplayedByArtist(input, onShowUnplayedByArtist);
      return;
    }
    if (safeInput.startsWith("play")) {
      handleOnPlay(input, onPlay);
      return;
    }

    switch (safeInput) {
      case COMMANDS["show all"]:
        handleOnShowAll(onShowAll);
        break;

      case COMMANDS["show unplayed"]:
        handleOnShowUnplayed(onShowUnplayed);
        break;

      case COMMANDS.quit:
        handleOnQuit(onQuit);
        break;

      default:
        throw CommandError(COMMAND_ERRORS.unsupportedAction(input), input);
    }
  };

  return {
    check,
  };
};

const handleOnAdd = (input, onAdd) => {
  const [albumTitle, artistName] = extractAndCheckQuotes(2, input);
  confirmCallback(COMMANDS.add, onAdd);
  onAdd(albumTitle, artistName);
};

const handleOnShowAll = (onShowAll) => {
  confirmCallback(COMMANDS["show all"], onShowAll);
  onShowAll();
};

const handleOnShowAllByArtist = (input, onShowAllByArtist) => {
  const [artistName] = extractAndCheckQuotes(1, input);
  confirmCallback(COMMANDS["show all by artist"], onShowAllByArtist);
  onShowAllByArtist(artistName);
};

const handleOnPlay = (title, onPlay) => {
  const [albumTitle] = extractAndCheckQuotes(1, title);
  confirmCallback(COMMANDS.play, onPlay);
  onPlay(albumTitle);
};

const handleOnShowUnplayed = (onShowUnplayed) => {
  confirmCallback(COMMANDS["show unplayed"], onShowUnplayed);
  onShowUnplayed();
};

const handleOnShowUnplayedByArtist = (name, onShowUnplayedByArtist) => {
  const [artistName] = extractAndCheckQuotes(1, name);
  confirmCallback(COMMANDS["show unplayed by artist"], onShowUnplayedByArtist);
  onShowUnplayedByArtist(artistName);
};

const handleOnQuit = (onQuit) => {
  confirmCallback(COMMANDS.quit, onQuit);
  onQuit();
};

const confirmCallback = (name, arg) => {
  if (!arg) {
    throw CommandError(COMMAND_ERRORS.missingCallback(name), name);
  }
  if (typeof arg !== "function") {
    throw CommandError(COMMAND_ERRORS.notFunction(name), name);
  }
};

const extractAndCheckQuotes = (numOfQuotes, input) => {
  const quotes = getQuotes(input);

  if (quotes.length !== numOfQuotes) {
    throw CommandError(COMMAND_ERRORS.missingData(quotes), input);
  }
  return quotes;
};

module.exports = { CommandChecker };
