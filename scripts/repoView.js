(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#repo');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render =  Handlebars.compile($("#repo-template").text());

  repoView.index = function() {
    $('#about').hide();
    $('#articles').hide();
    $('#repo').show();

    repos.requestRepos(function() {
      $('#repo ul').append(
        // REVIEW:
        repos.with('name').map(render)
      );


    });


  };

  module.repoView = repoView;
})(window);
