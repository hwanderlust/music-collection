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

    const state = { executed: false };
    const lowercaseInput = input.trim().toLowerCase();

    handleOnAdd({ input, lowercaseInput, state, onAdd });
    handleOnShowAllByArtist({
      name: input,
      lowercaseInput,
      state,
      onShowAllByArtist,
    });
    handleOnShowUnplayedByArtist({
      name: input,
      lowercaseInput,
      state,
      onShowUnplayedByArtist,
    });
    handleOnPlay({ title: input, lowercaseInput, state, onPlay });
    handleOnShowAll({ lowercaseInput, state, onShowAll });
    handleOnShowUnplayed({
      lowercaseInput,
      state,
      onShowUnplayed,
    });
    handleOnQuit({ lowercaseInput, state, onQuit });

    if (!state.executed) {
      throwUnsupportedError(input);
    }
  };

  return {
    check,
  };
};

const handleOnAdd = ({ input, lowercaseInput, state, onAdd }) => {
  if (lowercaseInput.startsWith("add")) {
    const [albumTitle, artistName] = extractAndCheckQuotes(2, input);
    confirmCallback(COMMANDS.add, onAdd);
    onAdd(albumTitle, artistName);
    state.executed = true;
  }
};

const handleOnShowAll = ({ lowercaseInput, state, onShowAll }) => {
  if (lowercaseInput === COMMANDS["show all"]) {
    confirmCallback(COMMANDS["show all"], onShowAll);
    onShowAll();
    state.executed = true;
  }
};

const handleOnShowAllByArtist = ({
  name,
  lowercaseInput,
  state,
  onShowAllByArtist,
}) => {
  if (lowercaseInput.startsWith("show all by")) {
    const [artistName] = extractAndCheckQuotes(1, name);
    confirmCallback(COMMANDS["show all by artist"], onShowAllByArtist);
    onShowAllByArtist(artistName);
    state.executed = true;
  }
};

const handleOnPlay = ({ title, lowercaseInput, state, onPlay }) => {
  if (lowercaseInput.startsWith("play")) {
    const [albumTitle] = extractAndCheckQuotes(1, title);
    confirmCallback(COMMANDS.play, onPlay);
    onPlay(albumTitle);
    state.executed = true;
  }
};

const handleOnShowUnplayed = ({ lowercaseInput, state, onShowUnplayed }) => {
  if (lowercaseInput === COMMANDS["show unplayed"]) {
    confirmCallback(COMMANDS["show unplayed"], onShowUnplayed);
    onShowUnplayed();
    state.executed = true;
  }
};

const handleOnShowUnplayedByArtist = ({
  name,
  lowercaseInput,
  state,
  onShowUnplayedByArtist,
}) => {
  if (lowercaseInput.startsWith("show unplayed by")) {
    const [artistName] = extractAndCheckQuotes(1, name);
    confirmCallback(
      COMMANDS["show unplayed by artist"],
      onShowUnplayedByArtist
    );
    onShowUnplayedByArtist(artistName);
    state.executed = true;
  }
};

const handleOnQuit = ({ lowercaseInput, state, onQuit }) => {
  if (lowercaseInput === COMMANDS.quit) {
    confirmCallback(COMMANDS.quit, onQuit);
    onQuit();
    state.executed = true;
  }
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

const throwUnsupportedError = (input) => {
  throw CommandError(COMMAND_ERRORS.unsupportedAction(input), input);
};

module.exports = { CommandChecker };
