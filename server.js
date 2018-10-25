var express = require('express');
var bodyParser = require('body-parser')
const rp = require('request-promise');
const cheerio = require('cheerio');
var app = express();


app.set('view engine', 'ejs');



app.use(express.static('views'));
app.use(bodyParser());


app.get('/*', function(req, res) {
    res.render('pages/index');
});

app.post('/search',function(req,res){
   
    var user = req.body.username;   
    var options = {
        uri: 'https://www.filmweb.pl/user/'+user+'/wantToSee?filmType=FILM',
        transform: function (body) {
          return cheerio.load(body);
        }
    };
    rp(options)
        .then(($) => {
          const movies = [];
      
      $('.filmPreview__title').each(function(i) {
        movies[i] = $(this).text();
      });
      
      var range = movies.length;
      
      
      
      movies.join(', ');
      console.log(range);
      console.log(movies);
      
      var drawn = Math.floor(Math.random() * range);
      var result = movies[drawn];
      console.log(result)

     res.render('pages/movie', {result: result});
      
        })
        .catch((err) => {
          console.log('somsing wrong!');
      });
});



app.listen(8000);
console.log('Running on port 8000');