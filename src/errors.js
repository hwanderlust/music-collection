const { capitalize, createEnum } = require("./utils");

const ERRORS = createEnum(["artist", "base", "command", "prompter"]);

const Error = (type, message, data) => {
  let baseError;
  if (!ERRORS[type]) {
    baseError = "base";
  }
  return {
    type: baseError ? baseError : type,
    message,
    data,
  };
};

const ArtistError = (message, data) =>
  Error(ERRORS.artist, buildMessage(ERRORS.artist, message), data);
// TODO: AlbumError
// TODO: MusicCollectionError
const CommandError = (message, data) =>
  Error(ERRORS.command, buildMessage(ERRORS.command, message), data);
const PrompterError = (message, data) =>
  Error(ERRORS.prompter, buildMessage(ERRORS.prompter, message), data);

const toName = (name) => capitalize(name) + " ";
const buildMessage = (type, msg) => toName(type) + " " + msg;

module.exports = {
  ERRORS,
  ArtistError,
  CommandError,
  PrompterError,
};
