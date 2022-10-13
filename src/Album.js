const { v4: uuidv4 } = require("uuid");
const { createEnum } = require("./utils");

const PLAYED_STATUS = createEnum(["unplayed", "played"]);

// TOOD: errors

class Album {
  static #all = new Map();
  static name = "Album";

  id;
  title;
  artist;
  playedStatus;

  constructor(title, artist) {
    this.id = uuidv4();
    this.title = title;
    this.artist = artist;
    this.playedStatus = PLAYED_STATUS.unplayed;
    Album.#all.set(this.id, this);
  }

  static allList() {
    return [...Album.#allMap()];
  }

  static #allMap() {
    return Album.#all.values();
  }

  static findByName(title) {
    const list = this.allList();
    const album = list.find(
      (album) => album.title.toLowerCase() === title.trim().toLowerCase()
    );
    return album;
  }

  play() {
    this.playedStatus = PLAYED_STATUS.played;
  }
}

module.exports = Album;
