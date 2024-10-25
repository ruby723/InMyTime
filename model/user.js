const mongoose = require('mongoose');

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
})

// 몽구스 모델 만들기(콜렉션Name, 스키마)
const User = mongoose.model('User',userSchema)
// 밖으로 내보내야 함
module.exportㄴ = { User }