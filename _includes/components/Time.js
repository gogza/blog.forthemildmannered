const moment = require('moment');
moment.locale('en');
module.exports = (time) => (`
  <div class="Time">
    <div>${ moment(time).format('MMM').toUpperCase() }</div>
    <div>${ moment(time).format('YYYY') }</div>
  </div>
`)
