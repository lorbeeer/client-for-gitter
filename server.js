import qs from 'qs'
import { fetchCounter } from './api/counter'
//import { renderToString } from 'react-dom/server'

import path from 'path'
import Express from 'express'
import OAuth from 'oauth'
import session from 'cookie-session'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import Webpack from 'webpack'
import webpackConfig from './webpack.config.babel'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './src/reducers/index'
import App from './src/containers/App'


const app = Express()
const compiler = Webpack(webpackConfig);
const port = 7000

app.use(session({secret: 'secret'}));
app.use(WebpackDevMiddleware(compiler, {
  publicPath: '/assets/' // Same as `output.publicPath` in most cases.
}));

//Serve static files
app.use('/static', Express.static('static'));

app.get('/', home);
app.use('/login/callback', callback);


const OAUTH_KEY     = 'aaec820f44048f24ed55cd1a77783dd0eda2b046';
const OAUTH_SECRET  = 'e27890cfa2fc0274072fc8db93d53ef5f0909710';
const BASEPATH      = 'https://gitter.im/';
const REDIRECT      = 'http://localhost:7000/login/callback';
const OAuth2 = OAuth.OAuth2;
const auth = new OAuth2(OAUTH_KEY, OAUTH_SECRET, BASEPATH, 'login/oauth/authorize', 'login/oauth/token');


function home (req, res){
  if(!req.session.token){
    const url = auth.getAuthorizeUrl({
      redirect_uri: REDIRECT, 
      response_type: 'code'
    });
    res.redirect(url);
  }else{

    const store = createStore(counterApp, {token: req.session.token})
    const finalState = store.getState()
    res.send(renderFullPage(finalState))
  }
};

function callback (req, res){
  const code = qs.parse(req.query).code;
  const params = {
    redirect_uri: REDIRECT, 
    grant_type: 'authorization_code'
  };
  auth.getOAuthAccessToken(code, params, (err, access_token) => {
    req.session.token = access_token;
    res.redirect('/');
  });
};

function renderFullPage(finalState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')}
        </script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port)