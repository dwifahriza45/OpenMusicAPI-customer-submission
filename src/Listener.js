class Listener {
  constructor(songsService, mailSender) {
    this._songsService = songsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      // playlist.songs = await this._service.getSongsPlaylistHandler(id);

      const playlist = await this._songsService.getPlaylistById(playlistId);
      playlist.songs = await this._songsService.getPlaylist(playlistId);

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
