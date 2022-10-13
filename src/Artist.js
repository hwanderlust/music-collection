const { v4: uuidv4 } = require('uuid');
const { ArtistError } = require("./errors");
const { toggleAndSetProperty } = require("./utils");

class Artist {
  static name = "Artist";
  static #all = new Map();

  id;
  name;

  constructor(name) {
    const existingInstance = Artist.findByName(name);
    if (existingInstance) {
      throw ArtistError(`'${name}' already exists.`);
    }

    this.id = uuidv4();
    this.name = name.trim();

    Object.defineProperties(this, {
      id: { value: this.id, writable: false, configurable: false },
      name: { value: this.name, writable: false, configurable: true },
    });

    Artist.#all.set(this.id, this);
    return this;
  }

  static allList() {
    return [...Artist.#allMap()];
  }

  static #allMap() {
    return Artist.#all.values();
  }

  static findByName(name) {
    const list = this.allList();
    const artist = list.find(artist => 
      artist.name.toLowerCase() === name.trim().toLowerCase()
    );
    return artist;
  }

  updateName(name) {
    toggleAndSetProperty(this, "name", name.trim());
  }

  remove() {
    Artist.#all.delete(this.id);
  }

}

module.exports = Artist;