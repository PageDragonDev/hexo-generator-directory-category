'use strict';

var _ = require("lodash");

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = function(locals) {

	var targetLayout = "landing";
	var categories = [];

	var pages = _.filter(locals.posts.data,function(page){
		return page.layout == targetLayout;
	});

	_.forEach(pages,function(page){

		_.forEach(page.categories.data, function(catData){
			var cat = catData.name;
			var category = _.find(categories,function(c){ return c.name.toLowerCase() == cat.toLowerCase();});
			if(!category) {

				category = {
					path: "landing-category/" + slugify(cat) + "/index.html",
					data: {
						pages:[],
						layout: "landing_category",
						title: cat
					},
					layout: "landing_category",
					name:cat
				};
				
				categories.push(category);
			}

			category.data.pages.push(page);

		});
	});

	return categories;
};
