var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()

app.get('/',(req,res)=>{
	res.status(200).sendFile(path.join(__dirname,'todo.html'))
})

app.get('/todo',(req,res)=>{
	var x = fs.readFileSync(path.join(__dirname,'todo'),'utf8')
	res.send(JSON.stringify(x))
})

app.post('/todo',(req,res)=>{
	var data = ''
	req.on('data',(chunk)=>{
		data += chunk
	})
	req.on('end',()=>{
		fs.writeFileSync(path.join(__dirname,'todo'),data)
		res.status(200).send()
	})
})

app.post('/delete',(req,res)=>{
	var id = ''
	req.on('data',(chunk)=>{
		id += chunk
	})
	req.on('end',()=>{
		id = parseInt(id)
		data = fs.readFileSync(path.join(__dirname,'todo'),'utf8')
		data = JSON.parse(data);
		var data2 = data.filter((chunk)=>{
			return chunk.id != id 
		})
		fs.writeFileSync(path.join(__dirname,'todo'),JSON.stringify(data2))
		res.status(200).send()
	})
})
app.listen(3000)