var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var server = express()

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
   
    response.render('home.ejs')
})
server.get('/contact-me', function(request, response){
   
    response.render('contact.ejs')
})
    

server.post('/', function(request, response){
    console.log(request.body)
    var names = request.body.people
    var arrayOfNames = names.split(',')
    var numberOfTeams = Number(request.body.numTeams)
    var totalNumberOfPlayers = arrayOfNames.length
    var teamLength = Math.floor(totalNumberOfPlayers / numberOfTeams)
    
    var teams = [ ]
    var currentTeam = [ ]
    
    while (arrayOfNames.length > 0) {
        var randomNumber = Math.floor(Math.random()*arrayOfNames.length)
        var randomPerson = arrayOfNames[ randomNumber]
        
        currentTeam.push(randomPerson)
        arrayOfNames.splice(randomNumber, 1)
        if(currentTeam.length >= teamLength) {
            teams.push(currentTeam)
            currentTeam= [ ]
        }
    }
     response.render('results.ejs', { data: teams })
})


var port = 8080

server.listen(port, () => {
    console.log('Server listening on port'+ port)
})
