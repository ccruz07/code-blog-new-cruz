(function(module) {
  var articlesController = {};


  articlesController.index = function(ctx, next) {
    Article.fetchAll(articleView.initIndexPage);
    $('#about').hide();
    $('#repo').hide();
    $('#articles').show();
     articleView.index(ctx.articles);

  };


    // COMMENT: What does this method do?    ANS: Get articles,attaches the article to the function, then calls next function
    //What is it's execution path?           ANS: calls middleware when user tries to go to specific article

    articlesController.loadById = function(ctx, next) {
      var articleData = function(article) {
        ctx.articles = article;
        next();
      };
      Article.findWhere('id', ctx.params.id, articleData);
    };


  module.articlesController = articlesController;
})(window);
