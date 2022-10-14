const Artist = require("./Artist");
const Album = require("./Album");
const { sendSingleMessage, sendGroupMessages } = require("./utils");
const { MusicCollectionError } = require("./errors");

const createMusicCollection = () => {
  let instance;

  class MusicCollection {
    static name = "MusicCollection";

    addAlbum(albumName, artistName) {
      const artist = findArtistOrCreate(artistName);
      const album = new Album(albumName, artist);
      sendSingleMessage(`Added "${album.title}" by ${artist.name}`);
      return album;
    }

    showAll() {
      const albums = Album.allList();
      if (albums && Array.isArray(albums)) {
        const messages = albums.map(toPrintAlbumWithArtistAndStatus);
        sendGroupMessages(messages);
      }
    }

    playAlbum(albumName) {
      const album = Album.findByName(albumName);
      if (!album) {
        sendSingleMessage(
          `Couldn't find an album by this title: "${albumName}."`
        );
        return;
      }
      album.play();
      sendSingleMessage(`You're listening to "${album.title}"`);
    }

    showAllByArtist(artistName) {
      const artist = findArtistOrThrow(artistName);
      const albums = Album.allList();
      if (albums && Array.isArray(albums)) {
        const filteredAlbums = albums.filter(byArtist.bind(this, artist));
        const messages = filteredAlbums.map(toPrintAlbumWithArtistAndStatus);
        sendGroupMessages(messages);
      }
    }

    showUnplayed() {
      const albums = Album.allList();
      if (albums && Array.isArray(albums)) {
        const filteredAlbums = albums.filter(byUnplayedStatus);
        const messages = filteredAlbums.map(toPrintAlbumWithArtist);
        sendGroupMessages(messages);
      }
    }

    showUnplayedByArtist(artistName) {
      const artist = findArtistOrThrow(artistName);
      const albums = Album.allList();
      if (albums && Array.isArray(albums)) {
        const filteredAlbums = albums.filter(
          byArtistAndUnplayedStatus.bind(this, artist)
        );
        const messages = filteredAlbums.map(toPrintAlbumWithArtist);
        sendGroupMessages(messages);
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

// helpers

const findArtistOrCreate = (artistName) => {
  const artist = Artist.findByName(artistName) || new Artist(artistName);
  if (!artist) {
    throw MusicCollectionError(`Something went wrong with: ${artistName}.`);
  }
  return artist;
};

const findArtistOrThrow = (artistName) => {
  const artist = Artist.findByName(artistName);
  if (!artist) {
    throw MusicCollectionError(
      `Couldn't find an artist by this name: ${artistName}.`
    );
  }
  return artist;
};

// predicates
const byArtist = (artist, album) => album?.artist?.id === artist?.id;
const byUnplayedStatus = (album) => album?.playedStatus === "unplayed";
const byArtistAndUnplayedStatus = (artist, album) =>
  album?.artist?.id === artist?.id && album?.playedStatus === "unplayed";
const toPrintAlbumWithArtist = (album) =>
  `"${album?.title}" by ${album?.artist?.name}`;
const toPrintAlbumWithArtistAndStatus = (album) =>
  `"${album?.title}" by ${album?.artist?.name} (${album?.playedStatus})`;

const musicCollection = createMusicCollection();

module.exports = musicCollection;
