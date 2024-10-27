const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { User } = require('./model/user')
const { auth } = require('./middleware/auth')


app.get("/api/user/auth",auth, (req,res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
})


mongoose.connect(config.mongoURI).then(() => console.log('DB connected'))
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

app.post('/api/user/login', async(req, res) => {
    //find the email
    const user = new User(await User.findOne({email: req.body.email}));

    if(user != null) {
        // 비밀번호 비교
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err) return res.status(400).send(err);
            if(!isMatch) {
                return res.json({loginSuccess: false, message:"비밀번호가 일치하지 않습니다."})
            }
        })
        
        // generate token 생성 및 등록
        user.generateToken((err, user) => {
            if(err) return res.status(400).send(err);

            // token을 쿠키에 넣기
            res.cookie("x_auth", user.token)
            .status(200)
            .json({loginSuccess: true, user:user.token});
        })
    } else {
        return res.json({loginSuccess: false, message: "이메일 정보를 찾을 수 없습니다."});
    }
})

app.get("/api/user/logout", auth, (req,res) => {
    User.findOneAndUpdate({id:req.user._id}, {token:""}).then((doc) => {
        return res.status(200).send({success:true});
    }).catch((err) => {
        return res.json({success:false, err});
    })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});