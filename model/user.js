const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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




// 몽구스 모델 만들기(콜렉션Name, 스키마)
const User = mongoose.model('User',userSchema)
// 밖으로 내보내야 함
module.exports = { User }