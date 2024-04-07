const { APIRouter, APIcustomes, APIservices, APIappoinment, APIpayments, APIproducts } = require("../routers/Api")

const middleware = (app) => {
    APIRouter(app);
    APIcustomes(app);
    APIservices(app);
    APIappoinment(app);
    APIpayments(app);
    APIproducts(app);
}
module.exports = middleware;