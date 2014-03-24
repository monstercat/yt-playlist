
var assert = require('better-assert');
var debug = require('debug')('yt-playlist:test');
var gapi = require('googleapis');
var OAuth2 = gapi.auth.OAuth2;

var channelId = process.env.CHANNEL_ID || "UCeDAMjAoztnS1WYGLzB2P_w";

var clientId = process.env.GAPI_CLIENT_ID;
var clientSecret = process.env.GAPI_CLIENT_SECRET;
var accessToken = process.env.GAPI_ACCESS_TOKEN;
var refreshToken = process.env.GAPI_REFRESH_TOKEN;

debug("cid %s sec %s acc %s ref %s",
      !!clientId, !!clientSecret, !!accessToken, !!refreshToken);

var oauth = new OAuth2(clientId, clientSecret);
oauth.credentials = {
  access_token: accessToken,
  refresh_token: refreshToken
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
