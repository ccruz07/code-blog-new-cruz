(function(module) {

  // Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
  var articleView = {};

  articleView.populateFilters = function() {
    $('article').each(function() {
      if (!$(this).hasClass('template')) {
        var val = $(this).find('address a').text();
        var optionTag = '<option value="' + val + '">' + val + '</option>';
        // Done: Ensure authors listed in the filter are unique
        if ($('#author-filter option[value="' + val + '"]').length === 0) {
          $('#author-filter').append(optionTag);
        }

        val = $(this).attr('data-category');
        optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#category-filter option[value="' + val + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };

  articleView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-author="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#category-filter').val('');
    });
  };

  articleView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#author-filter').val('');
    });
  };

  // DONE: Once the routes are handling "/" and "/about", we can delete this handleMainNav function. YESSSS!
  // DONE: Remeber to also remove any calls to this function, wherever they may originate!
  /*articleView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };*/

  articleView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();

    $('#articles').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
    });
  };

  articleView.initNewArticlePage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', articleView.create);
  };

  articleView.create = function() {
    var article;
    $('#articles').empty();

    // Instantiate an article based on what's in the form fields:
    article = new Article({
      title: $('#article-title').val(),
      author: $('#article-author').val(),
      authorUrl: $('#article-author-url').val(),
      category: $('#article-category').val(),
      body: $('#article-body').val(),
      publishedOn: $('#article-published:checked').length ? util.today() : null
    });

    $('#articles').append(article.toHtml());

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    // Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
    $('#export-field').show();
    $('#article-json').val(JSON.stringify(article) + ',');
  };

  articleView.initIndexPage = function() {
    Article.all.forEach(function(a){
      $('#articles').append(a.toHtml());
    });

    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    //articleView.handleMainNav();                       done
    articleView.setTeasers();
  };

articleView.handleFilters = function() {
$('#filters').one('change', 'select', function() {
resource = this.id.replace('-filter', '');
page('/' + resource + '/' + $(this).val().replace(/\W+/g, '+')); // Replace any/all whitespace with a +
});
};

  articleView.index = function(articles) {

      $('#articles').show().siblings().hide();

      $('#articles article').remove();
      if(articles)
      {
        articles.forEach(function(a) {
          $('#articles').html(render(a));
        });
      }
      articleView.populateFilters();
      // COMMENT: What does this method do?   ANS: calls articleView.populateFilters
      //What is it's execution path?          ANS: IDK????
      articleView.handleFilters();

      // DONE: Replace setTeasers with just the truncation logic, if needed:
      if ($('#articles article').length > 1) {
        $('.article-body *:nth-of-type(n+2)').hide();
      }

    };

    var render = function(article) {
      var template = Handlebars.compile($('#article-template').text());

      article.daysAgo = parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);
      article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';
      article.body = marked(article.body);

      return template(article);
    };

  articleView.initAdminPage = function() {
    var template = Handlebars.compile($('#author-template').text());

    Article.numWordsByAuthor().forEach(function(stat) {
      $('.author-stats').append(template(stat));
    });

    $('#blog-stats .articles').text(Article.all.length);
    $('#blog-stats .words').text(Article.numWordsAll());
  };

  module.articleView = articleView;
})(window);
