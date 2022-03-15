var express = require("express");
var router = express.Router();
const Article = require("../db").Article;
const read = require("node-readability");

router.get("/", (req, res, next) => {
  res.format({
    html: () => {
      res.render("welcome.ejs");
    },
  });
});

router.get("/articles", (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);

    res.format({
      html: () => {
        res.render("articles.ejs", { articles });
      },
      json: () => {
        res.send(articles);
      },
    });
  });
});

router.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);

    res.format({
      html: () => {
        res.render("article.ejs", { article });
      },
      json: () => {
        res.send(article);
      },
    });
  });
});

router.post("/articles/delete/:id", (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.post("/articles", (req, res, next) => {
  const url = req.body.url;
  var now = new Date();
  var time =
    now.getFullYear() +
    "/" +
    (now.getMonth() + 1) +
    "/" +
    now.getDate() +
    "  " +
    now.getHours() +
    ":" +
    now.getMinutes();

  read(url, (err, result) => {
    if (url.length == 0 || err || !result) res.status(500).send("Error");

    Article.create(
      { title: result.title, content: result.content, time: time },
      (err, article) => {
        if (err) return next(err);
        res.redirect("/articles");
      }
    );
  });
});

module.exports = router;
