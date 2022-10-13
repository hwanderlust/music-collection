const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const Prompter = require("./src/prompter");
const { ERRORS } = require("./src/errors");

(function main() {
  try {
    console.log(`Welcome to your music collection!`);
    const prompter = Prompter({ readline, input, output });
    prompter.init();
    
  } catch (error) {
    // TODO: review this again
    if (error.type === ERRORS.artist) {
      console.error(`Main error:`, error);
    } else {
      throw error;
    }
  }
})();