var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

	url = 'http://www.imdb.com/title/tt4046784/';
	request(url,function(error,response,html) {
		if(!error) {
			var $ = cheerio.load(html);
			var title,release,rating;
			var json = { title : "", release : "" , rating:""};


			$('.header').filter(function() {
				var data = $(this);
				title = data.children().first().text();
				release = data.children().last().children().text();

				json.title = title;
				json.release = release;
			})

			$('.star-box-giga-star').filter(function() { 
				var data = $(this);
				rating = data.text();

				json.rating = rating;
			})
                
		}
		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

res.send('Check your console!')

	});
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;

// http://www.careercup.com/question?id=23092663
// https://sourcemaking.com/design-patterns-and-tips
// http://www.javatpoint.com/corejava-interview-questions
// https://www.cs.cmu.edu/~adamchik/15-121/lectures/Class%20Design/classes.html
// http://www.indiabix.com/technical/dotnet/object-oriented-programming/