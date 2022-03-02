const { Pool } = require('pg');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name
      FROM playlists
      INNER JOIN users ON playlists.owner=users.id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getPlaylist(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlistsongs
      INNER JOIN songs ON playlistsongs.song_id = songs.id
      INNER JOIN playlists ON playlistsongs.playlist_id = playlists.id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = SongService;
