const path = require('path')

module.exports = {
  setupFiles: [
    path.resolve('jest/setupGlobals.js')
  ],
  testMatch: ['**/?(*.)(spec|test).js?(x)']
}