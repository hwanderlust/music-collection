# About Music Collection
A small system for managing your music collection. The system is accessible from the command line. You can create a list of albums by artists and track if you've played/listened to them.

## Commands
Add an album by an artist
- add "album name" "artist name"

Get a list of collection
- show all

Get an artist's albums
- show all by "artist name"

Play an album (only marks the album as 'played')
- play "album name"

Get a list of unplayed albums
- show unplayed

Get a list of unplayed albums by an artist
- show unplayed by "artist name"

Quit the program
- quit

## Program Limitations
- There can never be two albums with the same title, even if they have different artists; you cannot add two albums with the same title
- There isn't a persistence mechanism (i.e. a database). Data is stored in memory and will be empty each time the program starts.