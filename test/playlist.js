
var assert = require('better-assert');
var debug = require('debug')('yt-playlist:test');
var gapi = require('googleapis');
var OAuth2 = gapi.auth.OAuth2;

var channelId = process.env.CHANNEL_ID || "UCeDAMjAoztnS1WYGLzB2P_w";

var oauth = new OAuth2(process.env.GAPI_CLIENT_ID,
                       process.env.GAPI_CLIENT_SECRET);
oauth.credentials = {
  access_token: process.env.GAPI_ACCESS_TOKEN,
  refresh_token: process.env.GAPI_REFRESH_TOKEN
};

describe('playlist query', function(){
  var playlist;

  before(function(done){
    gapi.discover('youtube', 'v3').execute(function(err, client){
      playlist = require('..')(client);
      done();
    });
  });

  it('gets the right number of videos', function(done){
    playlist(channelId, { oauth: oauth, results: 5 }, function(err, vids) {
      debug("query err: %j", err);
      assert(!err);
      assert(vids != null);
      assert(vids.pageInfo != null);
      assert(vids.pageInfo.resultsPerPage === 5);
      assert(vids.items !== null);
      assert(vids.items.length <= 5);
      done();
    });
  });
});
