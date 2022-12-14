const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const MusicCollection = require("./src/MusicCollection");
const { CommandChecker } = require("./src/commands");
const { ERRORS } = require("./src/errors");
const Prompter = require("./src/prompter");

(function main() {
  try {
    const musicCollection = MusicCollection();
    const prompter = Prompter({ readline, input, output });

    const commandChecker = CommandChecker({
      onAdd: musicCollection.addAlbum,
      onShowAll: musicCollection.showAll,
      onShowAllByArtist: musicCollection.showAllByArtist,
      onPlay: musicCollection.playAlbum,
      onShowUnplayed: musicCollection.showUnplayed,
      onShowUnplayedByArtist: musicCollection.showUnplayedByArtist,
      onQuit: prompter.quit,
    });

    prompter.init(commandChecker);
  } catch (error) {
    if (error.type && error.type !== ERRORS.base) {
      console.error(`Main error:`, error);
    } else {
      throw error;
    }
  }
})();
