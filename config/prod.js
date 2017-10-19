module.exports = {
  port: process.env.PORT,
  super: {
    un: process.env.SUPER_USER_USERNAME,
    pw: process.env.SUPER_USER_PASSWORD
  },
  dbURI: process.env.MONGO_URI
};
