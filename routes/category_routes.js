
const category_controller = require("../controllers/category_controller")
const jwt_authenticate = require("../jwt/jwt_authenticate")

function category_routes(app){
    app.get('/category', category_controller.category_get)
    app.get("/category/:id", category_controller.category_get_id)
    app.post("/category/new",jwt_authenticate.authenticateToken, category_controller.category_post)
    app.put("/category/update/:id",jwt_authenticate.authenticateToken, category_controller.category_put)
    app.delete("/category/delete/:id",jwt_authenticate.authenticateToken, category_controller.category_delete)
}

module.exports = {
    category_routes
    
}