const Time = require('./Time.js');
const Token = require('./Token.js');

module.exports = (title, time) => (`
<h1>
  ${ Token() }
  <div>${ title }</div>
  <div>${ Time(time) }</div>
</h1>
`)
