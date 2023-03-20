//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Blogger is a free web-based platform that allows users to create and publish their own blogs. It was launched by Pyra Labs in 1999 and was acquired by Google in 2003. Blogger provides a simple and user-friendly interface that enables people to easily create and manage their blogs without requiring any programming or technical knowledge. To get started with Blogger, users need to create a Google account, and then sign up for a free blog. They can then choose from a range of customizable templates to design their blog, and start publishing posts by adding text, images, videos, and other multimedia content.Blogger has a large and active community of bloggers, who use the platform to share their thoughts, ideas, experiences, and expertise with others. It is widely used by individuals, businesses, and organizations to build their online presence, connect with their audience, and promote their products and services.";
const aboutContent = "I am Sai Kiran, I am pursuing my Post Graduation in Computer Science. My Hobbies are Designing, Developing UX/UI Models, Coding, Developing Websites.This Website is Specifically For the Bloggers for both Professional and Unprofessional People to share the content. Blogger also provides a range of features such as the ability to schedule posts for publishing, add tags and categories to posts, and enable comments and social sharing on their blogs. It also allows users to customize their blog's appearance, add widgets, and monetize their blogs by displaying ads.";
const contactContent = "For Ux/Ui Design collaboration, You Can Contact Me Via Whatsapp : 7386249400, Gmail: ksai7399@gmail.com, Via Instagram : i_kirankesavarapu";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
