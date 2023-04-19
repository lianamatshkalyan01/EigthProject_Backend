const { User } = require(".")
const CryptoJS = require("crypto-js")
const {generateAccessToken} = require("../jwt/jwt_generate")
const nodemailer = require("nodemailer")

function user_register(req, res){
    const {email, password}=req.body
    const emailRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Invalid email format"})
    }
    User.findOne({where:{email:email}}).then((user)=>{
        if(user){
            return res.status(400).json({error:"Email already exists"})
        }
        const hashed_password = CryptoJS.SHA256(password).toString()
        User.create({email, password:hashed_password, role:"user", is_verified:0}).then((data)=>{
            let token = generateAccessToken(data.role, email, 0)
            send_mail(email, token)
            res.status(201).json(data)
        }).catch((err)=>{
            res.status(500).json({error:err.message})
        })
    })
}

function user_login(req, res){
    const {email, password}=req.body
    const hashed_password = CryptoJS.SHA256(password).toString()
    User.findOne({where:{email:email}}).then((data)=>{
        console.log(data)
        if(data.email == email && data.password == hashed_password){
            
            let token = generateAccessToken(data.role, data.email, data.is_verified)
            res.send(JSON.stringify({status: "Logged in", jwt:token, role:data.role}))
        }else{
            res.send(JSON.stringify({status: "Wrong credentials"}));
        }
    }).catch((err)=> {
        res.status(500).json({error: err.message})
    })
}

function send_mail(mail,token){
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "liana.matshkalyan01@gmail.com",
            pass: "yaaklbpwupfofbsr"
        }
    })
    
    const mailOptions = {
        from: "liana.matshkalyan01@gmail.com",
        to: mail,
        subject: "Sending Email using Node.js",
        text: `sexmel http://localhost:5000/verify?token=${token}`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        } else{
            console.log(`Email sent: ` + info.response)
        }
    })
  }

  function verify(req, res){
    const token=req.query.token
    const decoded=jwt.verify(token,SECRET)
    User.update({is_verified:1}, {where:{email:decoded.email}}).then((user)=>{
        res.send("Email verfied")
    }).catch((err)=>{
        res.status(500).send("Error verfying email")
    })
  }

module.exports = {
    user_register, user_login, verify
}

