const service_controller = require("../controllers/service_controller")
const jwt_authenticate = require("../jwt/jwt_authenticate")

function service_routes(app){
    app.get("/services",service_controller.service_get)
    app.get("/category/:category_id/services", service_controller.service_get_id)
    app.post("/services/new",jwt_authenticate.authenticateToken, service_controller.service_post)
    app.put("/services/update/:service_id",jwt_authenticate.authenticateToken, service_controller.service_put)
    app.delete("/services/delete/:service_id",jwt_authenticate.authenticateToken, service_controller.service_delete)
}

module.exports = {
    service_routes
}