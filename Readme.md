
# yt-playlist

  List YouTube channel playlist items

## Installation

  Install with npm

    $ npm install yt-playlist

## Example

```js
var gapi = require('googleapis');

/*
 * oauth is needed to prevent rate limiting
 */
var oauth = new gapi.OAuthClient(process.env.GAPI_CLIENT_ID,
                                 process.env.GAPI_CLIENT_SECRET)
oauth.credentials = {
  access_token: process.env.GAPI_ACCESS_TOKEN,
  refresh_token: process.env.GAPI_REFRESH_TOKEN
}

gapi.discover('youtube', 'v3').execute(function(err, client){
  var videos = require('yt-playlist')(client);
  var opts = { playlist: 'uploads', oauth: oauth };
  videos("UCeDAMjAoztnS1WYGLzB2P_w", opts, function(err, vids){
  });
});


```

## API



## License

  The MIT License (MIT)

  Copyright (c) 2014 William Casarin

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
