const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const Prompter = require("./src/prompter");

(function main() {
  try {
    console.log(`Welcome to your music collection!`);
    const prompter = Prompter({ readline, input, output });
    prompter.init();
    
  } catch (error) {
    console.error(`Main error:`, error);
  }
})();