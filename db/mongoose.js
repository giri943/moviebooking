const mongoose = require('mongoose')

mongoose.connect(process.ENV.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
if (err) {
  console.log(err);
  throw err
}
console.log("Connected to DataBase".underline.brightCyan);
});
module.exports = { mongoose };


