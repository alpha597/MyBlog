const mongoose = require('mongoose');

function connectDB() {
  const url = "mongodb://127.0.0.1/blog_db";

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
connectDB();
const postSchema = new mongoose.Schema({
    title:{
     type:String,
     required :true
    },
    content:{
     type:String,
     required:true
    }
 }
 )
 
 const Post = mongoose.model('Post',postSchema);
 
const blog1 = new Post({
    title:'harry potter',
    content:'A magical book series'
})
blog1.save().then((p) =>{
    console.log(p);
})
.catch((err) => {
    console.log(err);
})