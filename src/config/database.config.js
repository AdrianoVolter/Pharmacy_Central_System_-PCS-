const { config } = require("dotenv");

config();

module.exports = {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  username: process.env.USERNAMEDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASE,
  port: process.env.PORT,
  define: {
    underscored: true,
    underscoredAll: true,
    timestamps: true,
  },
};
