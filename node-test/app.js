const express = require('express')
const bodyParser = require('body-parser')
const notes = [{
		noteId: 1,
		noteContent: "Hey guys, add your important notes here."
	}
]

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get("/", function (req, res) {
	res.render("home", {
		data: notes
	})
})

app.post("/", (req, res) => {
	const noteContent = req.body.noteContent
	const noteId = notes.length + 1;

	notes.push({
		noteId: noteId,
		noteContent: noteContent
	})

	res.render("home", {
		data: notes
	})
})

app.post('/update', (req, res) => {
	var noteId = req.body.noteId;
	var noteContent = req.body.noteContent;
	
	notes.forEach(note => {
		if (note.noteId == noteId) {
			note.noteContent = noteContent;
		}
	})
	res.render("home", {
		data: notes
	})
})

app.post('/delete', (req, res) => {
	var noteId = req.body.noteId;

	var j = 0;
	notes.forEach(note => {
		j = j + 1;
		if (note.noteId == noteId) {
			notes.splice((j - 1), 1)
		}
	})

	res.render("home", {
		data: notes
	})
})

app.listen(3000, (req, res) => {
	console.log("App is running on port 3000")
})
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
