const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { User } = require('./model/user')

mongoose.connect(config.mongoURI
    , {useNewUrlParser: true}).then(() => console.log('DB connected'))
                                .catch(err => console.error(err));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',(req,res) => {
    res.json({"hello~~~~":"Hi ~~~"})
})

app.post('/api/users/register', async (req,res) => {
    const user = new User(req.body)

    const result = await user.save().then(()=>{
        res.status(200).json({
          success: true
        })
      }).catch((err)=>{
        res.json({ success: false, err })
      })
})


app.listen(5000);