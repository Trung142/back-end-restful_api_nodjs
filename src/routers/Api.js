const express = require('express');
const { ShowUser, createUser, updateUser, deleteUser, handlelogin } = require('../controlers/apicontroler');
const { ShowCustomer, CreateCustomers, updateCustomers, deleteCustomers } = require('../controlers/customer');
const { ShowEmployeer, CreateEmployeer, updateEmployeer, deleteEmployeer } = require('../controlers/employeer');
const { ShowServices, CreateServices, updateServices, deleteServices } = require('../controlers/services');
const { ShowAppointment, CreateAppointment, updateAppointment, deleteAppointment, showapoin } = require('../controlers/Appointments');
const { ShowFeedbacks, CreateFeedbacks, updateFeedbacks, deleteFeedbacks } = require('../controlers/feeback');
const { ShowPayment, CreatePayment, updatePayment, deletePayment } = require('../controlers/Payments');
const { ShowProducts, CreateProducts, updateProducts, deleteProducts } = require('../controlers/Products');
const { ShowOrders, CreateOrders, updateOrders, deleteOrders } = require('../controlers/orders');
const { ShowOrder_Details, CreateOrder_Details, updateOrder_Details, deleteOrder_Details } = require('../controlers/order_details');
const router = express.Router();
const APIRouter = (req, res) => {
    router.get('/user', ShowUser);
    router.post('/user/1', createUser);
    router.put('/user/update/:id', updateUser);
    router.delete('/user/delete/:id', deleteUser);
    router.post('/user/login', handlelogin);
    return req.use('/api/v1', router);
}
//customer
const APIcustomes = (req, res) => {
    router.get('/customer', ShowCustomer);
    router.post('/create', CreateCustomers);
    router.put('/update', updateCustomers);
    router.delete('/delete', deleteCustomers);
}
//employees
const APIemployees = (req, res) => {
    router.get('/employees', ShowEmployeer);
    router.post('/create/employ', CreateEmployeer);
    router.put('/update/employ', updateEmployeer);
    router.delete('/delete/employ', deleteEmployeer);
}
//Services
const APIservices = (req, res) => {
    router.get('/services', ShowServices);
    router.post('/create/services', CreateServices);
    router.put('/update/services', updateServices);
    router.delete('/delete/services', deleteServices);
}
//apppointments
const APIappoinment = (req, res) => {
    router.get('/v2/:id', showapoin);
    router.get('/appointment', ShowAppointment);
    router.post('/create/appointment', CreateAppointment);
    router.put('/update/appointment', updateAppointment);
    router.delete('/delete/appointment', deleteAppointment);
}
//Feedbacks
const APIfeedbacks = (req, res) => {
    router.get('/feedback', ShowFeedbacks);
    router.post('/create/feedback', CreateFeedbacks);
    router.put('/update/feedback', updateFeedbacks);
    router.delete('/delete/feedback', deleteFeedbacks);
}
//Payments
const APIpayments = (req, res) => {
    router.get('/payment', ShowPayment);
    router.post('/create/payment', CreatePayment);
    router.put('/update/payment', updatePayment);
    router.delete('/delete/payment', deletePayment);
}
//Products
const APIproducts = (req, res) => {
    router.get('/product', ShowProducts);
    router.post('/create/product', CreateProducts);
    router.put('/update/product', updateProducts);
    router.delete('delete/product', deleteProducts);
}
//Order
const APIorders = (req, res) => {
    router.get('/order', ShowOrders);
    router.post('/create/order', CreateOrders);
    router.put('/update/order', updateOrders);
    router.delete('/delete/order', deleteOrders);
}
//Orders_Details
const APIorder_Details = (req, res) => {
    router.get('/order_detail', ShowOrder_Details);
    router.post('/create/order_detail', CreateOrder_Details);
    router.put('/update/order_detail', updateOrder_Details);
    router.delete('/delete/order_detail', deleteOrder_Details);
}
module.exports = {
    APIRouter,
    APIcustomes,
    APIemployees,
    APIservices,
    APIappoinment,
    APIfeedbacks,
    APIpayments,
    APIproducts,
    APIorder_Details,
    APIorders
}