var express = required('express');
var todoController = require('./controllers/TodoController');

var app = express();

//Set view engine
app.set("view engine", "ejs");

app.use(express.static('./public'));

// Fire Controllers
todoController(app);

app.listen(3000);
console.log("Listening to port 3000...");