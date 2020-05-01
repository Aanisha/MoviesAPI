var fs=require('fs');
var data=fs.readFileSync('movies.json');
var elements=JSON.parse(data);
const express = require("express");
const app = express();
const cors=require('cors');

app.listen(process.env.PORT|8000, () => console.log("Server Start at 5000 Port"));

app.use(express.static('public'));
app.use(cors());

app.get('/movies',alldata);
function alldata(request,response)
{
    response.send(elements);
}
app.get('/movies/:element/',searchElement);
function searchElement(request,response)
{
	var word=request.params.element;
	//word=word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
	
	var hasMatch =false;

      for (let index = 0; index < elements.length; ++index) 
      {

           var movie = elements[index];
           console.log(movie);

            if(movie.title === word)
            {
                hasMatch = true;
                break;
            }
            
       }
       if(hasMatch==true)
        reply=movie;
       else
       	reply={status:"Not Found"};
    
	response.send(reply);

}
app.get('/:year/',searchYear);
function searchYear(request,response)
{
	var word=request.params.year;
	//word=word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
	console.log(word);
	var hasMatch =false;
	var reply=[];

      for (let index = 0; index < elements.length; ++index) 
      {

           var movie = elements[index];
           //console.log(movie.year);

            if(parseInt(movie.year) === parseInt(word))
            {
                hasMatch = true;
                console.log(movie.year);
                reply.push(movie);
            }
            
       }
       if(hasMatch==false)
         reply={status:"Not Found"};
    
	response.send(reply);

}
