
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./functional-react-hooks.cjs.production.min.js')
} else {
  module.exports = require('./functional-react-hooks.cjs.development.js')
}
