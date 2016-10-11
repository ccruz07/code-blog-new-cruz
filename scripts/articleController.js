(function(module) {
  var articlesController = {};

  articlesController.index = function() {
    Article.createTable();
    Article.fetchAll(articleView.initIndexPage);
    $('#about').hide();
    $('#repo').hide();
    $('#articles').show();

  };

  module.articlesController = articlesController;
})(window);
