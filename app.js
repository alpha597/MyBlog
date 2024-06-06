const express = require('express');
const app = express();
const ejs = require('ejs');
const PORT =4000;
//const _ = require('loadash');
require('dotenv').config();

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
const homeContent ="This is a blog website.You can use it to compose blogs.After refreshing blogs will be visible."
const aboutContent ="This full stack blog website is made of Node.js,Express.js,mogoose,MongoDb"
const contactContent="later ..."

app.use(express.static("public"));
const bodyParser = require('body-parser');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));


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


app.get("/", async (req,res) => {
    Post.find({}).exec().then((result) =>{
        console.log(result);
        res.render('home',{startingContent:homeContent,posts:result});
    })
    .catch((err) =>{
        console.log(err);
    })
});


  app.get("/about", function (req, res) {
    res.render("about", { aboutContent: aboutContent });
  });
  
  app.get("/contact", function (req, res) {
    res.render("contact", { contactContent: contactContent });
  });
  
  app.get("/compose", function (req, res) {
    res.render("compose");
  });

  app.post("/compose", async (req,res) =>{
    const post= new Post({
        title:req.body.postTitle,
        content:req.body.postContent
    });
    await post.save();
    res.redirect("/");
    
  })
  app.get("/delete", async (req,res) =>{
    Post.find({}).exec().then((result) =>{
        console.log(result);
        res.render('delete',{posts:result});
    })
    .catch((err) =>{
        console.log(err);
    })
  })
  app.post("/delete", async (req,res) =>{
      const deleteId = req.body.deleteButton;
      const newpost = await Post.deleteOne({id:deleteId});
      res.redirect("/");
      
  })
  
app.listen(PORT,() =>{
    console.log("app started");
})
