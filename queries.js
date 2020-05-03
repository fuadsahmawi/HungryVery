const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
})
// Add sql queries here:
const employeesMorethan10 = (request, response) => {
  pool.query('SELECT DISTINCT eid FROM works WHERE hours > 10', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// TODO: SQL Queries

// Summary information for FDS managers:
// Monthly: Total number of new customers, total number of orders, total cost of orders

const monthlyOrdersAndCost = (request, response) => {
  pool.query('SELECT EXTRACT(month FROM orderTime) as month, COUNT(*) as totalOrders, SUM(totalCost) as totalCost FROM Orders GROUP BY EXTRACT(month FROM orderTime)', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// TODO: To get new customers, ensure month is current month, and is their first order
// const monthNewCustomers = (request, response) => {
//   pool.query('SELECT EXTRACT(month FROM orderTime) as month, COUNT(*) as totalOrders FROM Orders GROUP BY EXTRACT(month FROM orderTime)', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// Monthly-Customer: total number of orders by that customer, total cost of orders by that customer
// Hour-Delivery Location: total number of orders at that hour for that location
// Rider-Month: total number of orders delivered, avg delivery time, 
//              number of ratings for all orders, avg rating

// Summary information for restaurant staff:
// Monthly: total num of completed orders, total cost (excl delivery fee), top 5 fav food items
// Promo Campaign: for each campaign, duration (days/hours), avg number of orders

// Summary information for delivery riders:
// Weekly-Rider: total number of orders, total hours, total salary
// Monthly-Rider: total number of orders, total hours, total salary


// Add query functions here:
module.exports = {
  employeesMorethan10,
  monthlyOrdersAndCost,
}

/* Get all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Get a single user example
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Post a user
const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

// Update User
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
*/
