const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const con = require('./models/taskModel');

const app = express();

app.use(express.static('public'));

app.engine('handlebars', engine({
    helpers: {
        isCompleted: function (status) {
            if (status == "completed") {
                return true
            } else {
                return false
            }
        },
    },
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => { 
        let query = 'SELECT * FROM Todo';
        let items = []
        con.execute(query, (err, result) => {
            if (err) throw err;
            items = result;
            console.log(items);
            res.render('index', {
                items: items
            }
            )
        })
});

app.get('/:status/:id', (req, res) => {
let intCheck = req.params.id * 1;
if (Number.isInteger(intCheck)) {
    console.log(req.params)
    let query = "UPDATE Todo SET status='" + req.params.status + "' WHERE task_id=" + req.params.id
    con.execute(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/')
    });
} else {
    res.redirect('/');
};
});

app.get('/:id', (req, res) => {
// Validation to ensure req is an integer
let intCheck = req.params.id * 1;
if (Number.isInteger(intCheck)) {
    console.log(req.params)
        let query = "DELETE FROM Todo WHERE task_id=" + req.params.id
        con.execute(query, (err, result) => {
          if (err) throw err;
          console.log(result);
          res.redirect('/');
    })
} else {
    res.redirect('/');
}
});

app.post('/', (req, res) => {
    console.log(req.body.task)
    let query = "INSERT INTO Todo (task, status) VALUES ?";
    data = [
        [req.body.task, "ongoing"]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/')
    })
});

// port where app is served
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});