const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://molly723:jCvWFebLQUPrmkaC@cluster0.lug7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 '
    , {useNewUrlParser: true}).then(() => console.log('DB connected'))
                                .catch(err => console.error(err));




app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(5000);