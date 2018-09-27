var keyMirror = require('keymirror')

var constants = {
  APP: keyMirror({
    KEY_ONE: null,
    KEY_TWO: null
  }),
  logSource: {
    UI: 'APP-Client',
    SERVER: 'APP-Server'
  }
}

module.exports = constants
