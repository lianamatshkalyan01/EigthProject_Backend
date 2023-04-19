const user_controller = require('../controllers/user_controller')

function user_routes(app){
    app.post('/register', user_controller.user_register)
    app.post('/login', user_controller.user_login)
    app.get("/verify",user_controller.verify)
}

module.exports = {
    user_routes
}