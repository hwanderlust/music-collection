const { v4: uuidv4 } = require("uuid");
const Artist = require("./Artist");
const { AlbumError } = require("./errors");
const { createEnum, toggleAndSetProperty } = require("./utils");

const PLAYED_STATUS = createEnum(["unplayed", "played"]);

class Album {
  static #all = new Map();
  static name = "Album";

  id;
  title;
  artist;
  playedStatus;

  constructor(title, artist) {
    const existingInstance = Album.findByName(title);
    if (existingInstance) {
      throw AlbumError(`'${title}' already exists.`);
    }

    this.id = uuidv4();
    this.title = title;
    this.artist = artist;
    this.playedStatus = PLAYED_STATUS.unplayed;

    Object.defineProperties(this, {
      id: { value: this.id, writable: false, configurable: false },
      title: { value: this.title, writable: false, configurable: true },
      artist: { value: this.artist, writable: false, configurable: true },
      playedStatus: {
        value: this.playedStatus,
        writable: false,
        configurable: true,
      },
    });

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
    toggleAndSetProperty(this, "playedStatus", PLAYED_STATUS.played);
  }

  updateArtist(artistName) {
    const existingArtist = Artist.findByName(artistName);
    toggleAndSetProperty(
      this,
      "artist",
      existingArtist || new Artist(artistName.trim())
    );
  }

  updateTitle(title) {
    toggleAndSetProperty(this, "title", title.trim());
  }
}

module.exports = Album;
