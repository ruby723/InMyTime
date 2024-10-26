const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

// 스키마 만들기
const userSchema = mongoose.Schema({
    name : {
        type: String,
        maxlength: 50
    },
    email : {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0  //normalUser,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
});

// save함수 실행 전 실행되는 함수 (비밀번호 해시 처리)
userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                user.password = hash;
                next();
            });
        });
        
    } else {
        next()
    }
    
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    }) ;
}

userSchema.methods.generateToken = async function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'seceret')

    user.token = token;

    await user.save().then(() => {
        cb(null, user);
    }).catch((err) => {
        return cb(err);
    })
    // user.save(function(err, user){
    //     if(err) return cb(err)
    //     cb(null, user);
    // })
}

userSchema.static.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, 'seceret', function(err, decode) {
        user.findOne({"id":decode, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
    })
}


// 몽구스 모델 만들기(콜렉션Name, 스키마)
const User = mongoose.model('User',userSchema)
// 밖으로 내보내야 함
module.exports = { User }