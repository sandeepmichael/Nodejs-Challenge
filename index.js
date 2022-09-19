
const express = require('express')



const app = express();
const newtodolist = [];
app.get('/todos', (req, res) => {
    var request = require('request');
    request("https://jsonplaceholder.typicode.com/todos", (err, response, body)=>{
      
        
        let data = JSON.parse(body)
       
    
        if(response.statusCode == 200){
       
         data.map(x => {
            newtodolist.push(x.id)
            newtodolist.push(x.title)
            newtodolist.push(x.completed)
         })
         res.send(newtodolist)   // Here in this array we get information without userid field..
            
        }
        
    })
})


app.get('/users/:id', (req, res) => {
    var id = req.params.id
    var request = require('request');
    request(`https://jsonplaceholder.typicode.com/users/${id}`, (err, response, body) => {
        let data = JSON.parse(body);
        //console.log(data)
        const list = [];
        if(response.statusCode == 200){
            
           const {id, name, email, phone} = data;
           list.push(id);
           list.push(name);
           list.push(email)
           list.push(phone)
           // console.log(list);
        }else {
            res.send(err)
        }
        request("https://jsonplaceholder.typicode.com/todos", (err, response, body) => {
            let data = JSON.parse(body);
            //console.log(data)
           if(response.statusCode == 200){
                const result = data.filter(x => x.userId==req.params.id);
                //console.log(result);
                list.push(result);
                res.send(list);
            }else {
                res.send(err);
            }
          
        })

    })
})



app.listen(3000, () => {
    console.log('server is on port 3000')
})