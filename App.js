//jshint esversion:6


const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.set('view engine', 'ejs')
var items = ['Buy food','Cook food',];
let WorkItems =[]

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get("/", function (req, res) {
    var today = new Date()

        var options ={
            weekday:'long',
            day: 'numeric',
            month:'long'
        }


        var day = today.toLocaleDateString('en-US', options)


    res.render("list", {ListTitle: day, NewListItems: items})
})

app.post('/', function (req, res) {
    let item = req.body.newItem 
    if (req.body.List === 'work') {
        WorkItems.push(item)
        res.redirect('/work')
    } else{
        items.push(item)
        res.redirect('/')
    }

  

})

app.get('/work', function (req, res) {
    res.render('list', {ListTitle: "Work List", NewListItems: WorkItems})
})
app.post('/work', function (req, res) {
    var item = req.body.newItem 
    WorkItems.push(item)
    res.redirect('/work')
})



app.listen(3000, function () {
    console.log("server started on port 3000")
})