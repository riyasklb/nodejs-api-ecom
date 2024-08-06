// index.js
const express = require('express');
const app = express();
const users = require('./model/authmodel');
const PORT = process.env.PORT;

const mongoose = require('mongoose');




mongoose.connect('mongodb+srv://riyasklb:56146925@cluster0.5rbmmub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });




app.use(express.json())


app.get('/users', async (req, res) => {
  try {
    const data = await users.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/register',async (req, res) => {
  try {
    const user = await users.create(req.body);

    
    
    res.status(201).send(user)
   
  } catch (error) {
    res.status(500).send
    console.log(error)
  }

},);

app.post('/login', (req, res) => {
  const user = users.find(user => user.name == req.body.name)

  if (user == null) {
    return res.status(400).send("cannot find user")
  }
  try {
    if (req.body.password == user.password && user.name == req.body.name) {
      res.status(201).send('success')
      res.json(users)
    } else {
      res.send('not allowed')
    }


  } catch (error) {
    res.status(500).send
    console.log(error)
  }

},);




