const dotenv = require("dotenv").config()

const env = {
  DBURL: process.env.DBURL,
  SECRETKEYSESSIONS: process.env.SECRETKEYSESSIONS
}

module.exports = env