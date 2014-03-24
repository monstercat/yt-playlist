
/**
 * Auth a request
 */
function auth(opts, req) {
  if (opts.oauth) req.withAuthClient(opts.oauth);
  else if (opts.key) req.withApiKey(opts.key);
}

/**
 * Get a list of video resources from a channel's playlist
 *
 * @param {Function} fn
 * @api public
 */
var exports = module.exports = function(client) {
  return function(id, opts, done) {
    if (done == null) {
      done = opts;
      opts = {};
    }
    opts.playlist = opts.playlist || "uploads";

    var req = client.youtube.channels.list({
      id: id,
      part: opts.part || 'contentDetails'
    });

    auth(opts, req);

    req.execute(function (err, res) {
      if (err) return done(err);
      var playlistId = res.items[0].contentDetails.relatedPlaylists[opts.playlist];
      var req = client.youtube.playlistItems.list(opts.items || {
        playlistId: playlistId,
        part: 'snippet',
        maxResults: opts.results || 50
      });

      auth(opts, req);

      req.execute(done);
    });
  };
};
