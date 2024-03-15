const { APIRouter, APIcustomes, APIemployees, APIservices, APIappoinment, APIpayments, APIproducts } = require("../routers/Api")

const middleware = (app) => {
    APIRouter(app);
    APIcustomes(app);
    APIemployees(app);
    APIservices(app);
    APIappoinment(app);
    APIpayments(app);
    APIproducts(app);
}
module.exports = middleware;