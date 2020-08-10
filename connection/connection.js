const mongoose = require("mongoose");

const URL_CONNECTION_MONGODB = "mongodb+srv://josequintino:Kintino8@plblog.peuku.mongodb.net/PLBLOG?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose.connect(URL_CONNECTION_MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;
