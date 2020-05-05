const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3001

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// Add URL to the query functions
app.get('/q1', db.employeesMorethan10)
app.get('/monthly-summary', db.monthlyOrdersAndCost)
app.get('/customer', db.customerList)
app.post('/customer', db.addCustomer)
app.delete('/customer/:cid', db.deleteCustomer)
app.put('/customer/:cid', db.updateCustomer)
app.get('/restaurant', db.restaurantList)
app.get('/food/:rid', db.foodList)
app.get('/review/:rid', db.reviewList)
app.post('/rstaff', db.addStaff)
app.post('/food', db.addFood)
app.post('/sells', db.assignFood)
app.put('/food/:foodid', db.updateFood)
app.get('/hourly-order/:location', db.hourlyOrderSummary)
app.get('/monthly-cust-order/:cid', db.monthlyCustomerOrderAndCost)
app.get('/monthly-rider', db.monthlyRiderSummary)
app.get('/monthly-delivery', db.monthlyDeliverySummary)
app.get('/top-food/:rid', db.topFiveFoodItems)

app.listen(port, () => {
  console.log('Server started on port ' + port + '.')
})

