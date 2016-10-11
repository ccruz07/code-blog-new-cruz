(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#articles').hide();
    $('#repo').hide();

    $('#about').show();
  };


  module.aboutController = aboutController;
})(window);
