(function(module) {
  var aboutController = {};

/*
  aboutController.loadByWhat = function(ctx, next) {
     var aboutData = function(about) {
       ctx.articles = about;
       next();
     };
  }
  */

  aboutController.index = function() {
    $('#articles').hide();
    $('#repo').hide();
    $('#about').show();

    $.get("/siteinfo.html", function(data) {
      $("#about").html(data);
    })

  };


  module.aboutController = aboutController;
})(window);
