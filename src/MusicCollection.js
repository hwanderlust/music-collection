const Artist = require("./Artist");
const Album = require("./Album");

const createMusicCollection = () => {
  let instance;

  class MusicCollection {
    static name = "MusicCollection";

    addAlbum(albumName, artistName) {
      const artist = new Artist(artistName);
      if (!artist) {
        console.warn(`Can't find artist: ${artistName}`);
        return;
      }
      const album = new Album(albumName, artist);
      return album;
    }

    showAll() {
      const albums = Album.allList();
      if (albums && Array.isArray(albums)) {
        printEmptyLine();
        albums.forEach((album) => {
          console.log(
            `"${album.title}" by ${album.artist.name} (${album.playedStatus})`
          );
        });
      }
    }

    playAlbum(albumName) {
      const album = Album.findByName(albumName);
      if (!album) {
        console.warn(`Couldn't find an album by this title: "${albumName}."`);
        return;
      }
      album.play();
      printEmptyLine();
      console.log(`You're listening to "${album.title}"`);
    }

    showAllByArtist(artistName) {
      const artist = Artist.findByName(artistName);
      if (!artist) {
        console.warn(`Couldn't find an artist by this name: ${artistName}.`);
        return;
      }

      const albums = Album.allList();
      if (albums && Array.isArray(albums)) {
        const filteredAlbums = albums.filter(
          (album) => album.artist.id === artist.id
        );
        filteredAlbums.forEach((album) => {
          console.log(
            `"${album.title}" by ${album.artist.name} (${album.playedStatus})`
          );
        });
      }
    }

    showUnplayed() {
      const albums = Album.allList();
      if (albums && Array.isArray(albums)) {
        const filteredAlbums = albums.filter(
          (album) => album.playedStatus === "unplayed"
        );
        filteredAlbums.forEach((album) => {
          console.log(`"${album.title}" by ${album.artist.name}`);
        });
      }
    }

    showUnplayedByArtist(artistName) {
      const artist = Artist.findByName(artistName);
      if (!artist) {
        console.warn(`Couldn't find an artist by this name: ${artistName}.`);
        return;
      }

      const albums = Album.allList();
      if (albums && Array.isArray(albums)) {
        const filteredAlbums = albums.filter(
          (album) =>
            album.artist.id === artist.id && album.playedStatus === "unplayed"
        );
        // if found, print out line by line
        filteredAlbums.forEach((album) => {
          console.log(`"${album.title}" by ${album.artist.name}`);
        });
      }
    }
  }

  return () => {
    if (!instance) {
      instance = new MusicCollection();
    }
    return instance;
  };
};

// TODO: all below and more error handling

// helpers
const findArtist = () => {
  // include if check
  return undefined;
};
const getAlbums = () => {
  // include if check
  return [];
};

// predicates
const byArtist = () => {};
const byArtistAndUnplayedStatus = () => {};

// loggers
const printEmptyLine = () => console.log("");
const printWithStatus = () => {};
const printWithoutStatus = () => {};

const musicCollection = createMusicCollection();

module.exports = musicCollection;
