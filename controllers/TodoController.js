var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cluster0.9hlj4.mongodb.net', {
    dbName: 'todo',
    user: 'weird',
    pass: 'test',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected'));

//Create schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({
//     item: 'get-flowers'
// }).save(function(err) {
//     if (err) throw err;

//     console.log('Item Saved');
// });


// var data = [{item: "get milk"}, {item: "walk dog"}];
var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err;

            res.render('todo', {
                todos: data
            });
        });
    });

    app.post('/todo', urlEncodedParser, function (req, res) {
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data) {
            if (err) throw err;
            res.json(data);
        }); 

        
    });
};
