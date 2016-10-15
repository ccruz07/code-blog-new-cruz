page('/',
articlesController.index);
page('/about',
       aboutController.index);
page('/repo', repoView.index);


page('/articles/:id',
articlesController.loadById,
  articlesController.index
);
page();
