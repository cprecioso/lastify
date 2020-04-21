const dotenvVars = require("dotenv").config()

module.exports = {
  env: dotenvVars.parsed || {},
}
