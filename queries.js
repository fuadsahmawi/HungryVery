const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
})
// TODO: SQL Queries

// List of Customers

const customerList = (request, response) => {
  pool.query('SELECT * FROM Customers', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Add new customer

const addCustomer = (request, response) => {
  const { cname, contact } = request.body
  pool.query('INSERT INTO Customers(cname, contact) VALUES ($1, $2) RETURNING *', [cname, contact], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Update details of customer

const updateCustomer = (request, response) => {
  const { cid } = request.params
  const { cname, contact } = request.body
  pool.query('UPDATE Customers SET cname = $1, contact = $2 WHERE cid = $3', [cname, contact, cid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Delete customer

const deleteCustomer = (request, response) => {
  const { cid } = request.params
  pool.query('DELETE FROM Customers WHERE cid = $1', [cid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// List of Restaurants

const restaurantList = (request, response) => {
  pool.query('SELECT * FROM Restaurants', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// List of food by a certain Restaurant

const foodList = (request, response) => {
  const { rid } = request.body
  pool.query('SELECT foodid, fname, category, price, available FROM Sells natural join Food WHERE rid = $1', [rid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


// Add new restaurant staff

const addStaff = (request, response) => {
  const { sname, rid } = request.body
  pool.query('INSERT INTO Staffs(sname, rid) VALUES ($1, $2) RETURNING *', [sname, rid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

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
const monthlyCustomerOrderAndCost = (request, response) => {
  const cid = request.params.cid
  pool.query(
    'SELECT M.cid, COUNT(*) as numberOfOrders, SUM(O.totalCost) as totalCostOfOrders ' +
    'FROM Orders AS O INNER JOIN Makes AS M ' +
    'ON M.orderid = O.orderid ' +
    'GROUP BY M.cid WHERE M.cid = $1',
    [cid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

// Hour-Delivery Location: total number of orders at that hour for that location
const hourlyOrderNumbers = (request, response) => {
  const location = request.params.location
  pool.query('SELECT EXTRACT(hour FROM orderTime) as orderHour, COUNT(*) as numberOfOrders FROM Orders GROUP BY EXTRACT(hour FROM orderTime) WHERE dlocation = $1', [location], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

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
  monthlyOrdersAndCost,
  customerList,
  restaurantList,
  addCustomer,
  addStaff,
  deleteCustomer,
  updateCustomer,
  foodList,
  hourlyOrderNumbers,
  monthlyCustomerOrderAndCost
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
