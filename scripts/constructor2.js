//Portfolio constructor2.js     REDESIGN//
//Functional Programming concepts//
(function() {

var articles = [];                      //CLASS07 //

function Article (opts) { 
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {

  var articleTemplate = $("#article-template").html();
  var compiledTemplate = Handlebars.compile(articleTemplate);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return compiledTemplate(this);

};

$.getJSON("scripts/blogArticles.json", function(data) {
  articles.numWordsAll = function() {
    return articles.map(function(article) {
      return article.body.split(" ").length;// Get the total number of words in this article
    })
    .reduce(function(a, b) {
      return a+b; // Sum up all the values in the collection
    })
  };



  rawData = data;
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    articles.push(new Article(ele));
  })

  articles.forEach(function(a){
    $('#articles').append(a.toHtml() + "(word count: " + articles.numWordsAll() + ")");
  });

});

})();
