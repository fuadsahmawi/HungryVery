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

// Add sql queries here:

const customerList = (request, response) => {
  pool.query('SELECT * FROM Customers', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get customer

const getCustomer = (request, response) => {
  const { cid } = request.params
  pool.query('select cname, contact, rewardpoints from Customers where cid = $1', [cid], (error, results) => {
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

// Add new rider (Manager POV)

const addRider = (request, response) => {
  const { rname, vnumber, mid } = request.body
  pool.query('INSERT INTO riders(ridername, vnumber,mid) VALUES ($1, $2) RETURNING *', [rname, vnumber,mid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Update details of rider (Rider POV)

const updateRider = (request, response) => {
  const { riderid } = request.params
  const { ridername, vnumber } = request.body
  pool.query('UPDATE riders SET ridername = $1, vnumber = $2 WHERE riderid = $3', [ridername, vnumber, riderid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Delete Fulltimer rider (Manager POV)

const deleteFulltimer = (request, response) => {
  const { rid } = request.params
  pool.query('DELETE FROM fulltimer WHERE riderid = $1', [rid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteParttimer = (request, response) => {
  const { rid } = request.params
  pool.query('DELETE FROM parttimer WHERE riderid = $1', [rid], (error, results) => {
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

// Add new food

const addFood = (request, response) => {
  const { fname, category, amountOrdered, orderLimit, price} = request.body
  pool.query('INSERT INTO Food(fname, category, amountOrdered, orderLimit, price) VALUES ($1, $2, $3, $4, $5) RETURNING *', [fname, category, amountOrdered, orderLimit, price], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Assign food to a restaurant after adding

const assignFood = (request, response) => {
  const { foodid, promoid, rid } = request.body
  pool.query('INSERT INTO Sells(foodid, promoid, rid) VALUES ($1, $2, $3) RETURNING *', [foodid, promoid, rid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Update details of Food

const updateFood = (request, response) => {
  const { foodid } = request.params
  const { fname, category, amountOrdered, orderLimit, price} = request.body
  pool.query('UPDATE Food SET fname = $1, category = $2, amountOrdered = $3, orderLimit = $4, price = $5, WHERE foodid = $6', [fname, category, amountOrdered, orderLimit, price, foodid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get food by foodid

const getFood = (request, response) => {
  const { foodid } = request.params
  pool.query('SELECT foodid, fname, category, amountOrdered, orderLimit, price FROM Food WHERE foodid = $1', [foodid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// List of food by a certain Restaurant

const foodList = (request, response) => {
  const { rid } = request.params
  pool.query('SELECT foodid, fname, category, amountOrdered, orderLimit, price FROM Sells natural join Food WHERE rid = $1', [rid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Transaction for submitting an order
// CREATE TABLE Makes (
// 	cid 			INTEGER,
// 	orderid			INTEGER,
// 	foodid			INTEGER,
// 	amount          INTEGER,
// 	FOREIGN KEY (cid) references Customers,
// 	FOREIGN KEY (orderid) references Orders,
// 	FOREIGN KEY (foodid) references Food
// );

// INSERT INTO Sells(foodid, promoid, rid) VALUES ($1, $2, $3) RETURNING *, [foodid, promoid, rid], (error, results) => {
// insert into Makes (cid, orderid, foodid, amount) values (944, 493, 51, 2);

// const submitOrder = async () => {
//   const client = await pool.connect()
//   const { cid } = request.params
//   const { cart, dlocation, postalcode, selected, timeStamp, cartPrice} = request.body
//   try {
//     await client.query('BEGIN')
//     // const orderInsert = 'INSERT INTO Orders (dlocation, postalcode, orderTime, assignTime, arrivalTime, departTime, deliveryTime, deliveryFee, totalCost, rid, riderid)' + 
//     //     'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
//     // const res = await client.query(orderInsert, [dlocation, postalcode, timeStamp, null, null, null, null, 5, cartPrice, selected, null])
//     const res = client.query('SELECT foodid, fname, category, amountOrdered, orderLimit, price FROM Sells natural join Food WHERE rid = $1', [selected])
//     console.log(res.rows)
//     //response.status(200).json(res.rows)
//     await client.query('COMMIT')
//   } catch (e) {
//     await client.query('ROLLBACK')
//     //throw e
//   } finally {
//     client.release()
//   }
// }

  const submitOrder = (request, response) => {
    const { cid } = request.params
    const { cart, dlocation, postalcode, selected, timeStamp, cartPrice} = request.body
    
    pool.connect((err, client, done) => {
      const shouldAbort = err => {
        if (err) {
          console.error('Error in transaction', err.stack)
          client.query('ROLLBACK', err => {
            if (err) {
              console.error('Error rolling back client', err.stack)
            }
            // release the client back to the pool
            done()
          })
        }
        return !!err
      }
      client.query('BEGIN', err => {
        if (shouldAbort(err)) return
        client.query('SELECT foodid, fname, category, amountOrdered, orderLimit, price FROM Sells natural join Food WHERE rid = $1', [selected], (err, res) => {
          if (shouldAbort(err)) return

            client.query('COMMIT', err => {
              if (err) {
                console.error('Error committing transaction', err.stack)
              }
              done()
            })
        })
      })
    })
}

// List of reviews by a certain Restaurant

const reviewList = (request, response) => {
  const { rid } = request.params
  pool.query('SELECT reviewid, foodRating, foodReview, cname FROM Reviews natural join Orders natural join Customers WHERE rid = $1', [rid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// List of promotions

const promotionsList = (request, response) => {
  pool.query('SELECT * FROM Promotions ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Add new restaurant staff

const addStaff = (request, response) => {
  const { sname, rid } = request.body
  pool.query('INSERT INTO Staff(sname, rid) VALUES ($1, $2) RETURNING *', [sname, rid], (error, results) => {
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
  const cid = parseInt(request.params.cid)
  pool.query(
    'SELECT M.cid, COUNT(*) as numberOfOrders, SUM(O.totalCost) as totalCostOfOrders ' +
    'FROM Orders AS O INNER JOIN Makes AS M ' +
    'ON M.orderid = O.orderid ' +
    'AND M.cid = $1 ' +
    'GROUP BY M.cid ',
    [cid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

// // Hour-Delivery Location: total number of orders at that hour for that location
// const hourlyOrderSummary = (request, response) => {
//   const location = String(request.params.location)
//   pool.query('SELECT EXTRACT(hour FROM orderTime) as orderHour, COUNT(*) as numberOfOrders FROM Orders GROUP BY EXTRACT(hour FROM orderTime) WHERE dlocation = $1', [location], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }
// district-hour-totalorder: total number of orders in that district by hours
const hourlyOrderSummary = (request, response) => {
    const location = String(request.params.location)
    pool.query(
      "select district, EXTRACT(hour FROM orderTime) as hour, count(orderid) as totalorders from orders JOIN "+ 
      "postaldistrict ON left(postalcode,2) = sector group by district, EXTRACT(hour FROM orderTime) order by district", 
      (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


// Rider-Month: total number of orders delivered, avg delivery time, 
//              number of ratings for all orders, avg rating
const monthlyDeliverySummary = (request, response) => {
  pool.query(
    'SELECT R1.riderid, EXTRACT(month FROM O.orderTime) as month, COUNT(DISTINCT O.orderid) as numberOfOrders, SUM(O.totalCost) as totalCostOfOrders ' +
    'FROM Orders AS O, Riders AS R1, Reviews AS R2 ' +
    'WHERE R1.riderid = O.riderid ' +
    'AND R2.orderid = O.orderid ' +
    'GROUP BY R1.riderid, EXTRACT(month FROM O.orderTime)', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

// Summary information for restaurant staff:
// Monthly: total num of completed orders, total cost (excl delivery fee)
const monthlyRestaurantSummary = (request, response) => {
  const rid = parseInt(request.params.rid)
  pool.query('SELECT O.rid, EXTRACT(month FROM O.orderTime) as month, COUNT(DISTINCT O.orderid) AS numOrders, SUM(O.totalCost) AS totalCost ' +
    'FROM Orders as O, Makes as M WHERE O.orderid = M.orderid ' +
    'AND O.rid = $1 GROUP BY O.rid, EXTRACT(month FROM O.orderTime) ', [rid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


// Restaurant top 5 fav food items
const topFiveFoodItems = (request, response) => {
  const rid = parseInt(request.params.rid)
  pool.query('SELECT X.rid, X.foodid, X.numOrders ' +
    'FROM (SELECT O.rid, M.foodid, SUM(M.amount) AS numOrders FROM Makes AS M, Orders as O ' +
    'WHERE M.orderid = O.orderid GROUP BY O.rid, M.foodid) AS X ' +
    'WHERE X.rid = $1 ORDER BY X.numOrders DESC LIMIT 5', [rid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


// Promo Campaign: for each campaign, duration (days/hours), avg and total number of orders
// TODO: avg number of orders per promo campaign
const promotionsSummary = (request, response) => {
  pool.query(
    'SELECT P.promoid, P.pname, ' +
    'COALESCE(DATE_PART(\'day\', enddatetime::timestamp-startdatetime::timestamp), DATE_PART(\'day\', NOW()::timestamp-startdatetime::timestamp)) as daysDuration, ' +
    // 'COALESCE(DATE_PART(\'timezone_hour\', enddatetime::timestamp-startdatetime::timestamp), DATE_PART(\'timezone_hour\', NOW()::timestamp-startdatetime::timestamp)) as hoursDuration, ' +
    // 'COALESCE((EXTRACT(EPOCH FROM (enddatetime-startdatetime))/1440), (EXTRACT(EPOCH FROM (NOW()-startdatetime))/1440)) as daysDuration, ' +
    'COALESCE((EXTRACT(EPOCH FROM (enddatetime-startdatetime))/3600), (EXTRACT(EPOCH FROM (NOW()-startdatetime))/3600)) as hoursDuration, ' +
    'COUNT(DISTINCT M.orderid) as numberOfOrders ' +
    'FROM Promotions AS P, Sells AS S, Makes as M ' +
    'WHERE M.foodid = S.foodid ' +
    'AND S.promoid = P.promoid ' +
    'GROUP BY P.promoid ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

// Summary information for delivery riders:
// Weekly-Rider: total number of orders, total hours, total salary


// Monthly-Rider: total number of orders, total hours, total salary, average delivery time 
const monthlyRiderSummary = (request, response) => {
  pool.query(
    'SELECT R1.riderid, EXTRACT(month FROM O.orderTime) as month, COUNT(distinct O.orderid) as numberOfOrders ' +
    'SUM(O.deliveryfee) as totalDeliveryFees, AVG((EXTRACT(EPOCH FROM (O.deliverytime-O.arrivaltime))/216000)) as averageDeliveryTime ' +
    'FROM Orders AS O, Riders AS R1, Reviews AS R2 ' +
    'WHERE R1.riderid = O.riderid ' +
    'AND R2.orderid = O.orderid ' +
    'GROUP BY R1.riderid, EXTRACT(month FROM O.orderTime)', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const monthlySpecificRiderSummary = (request, response) => {
  const riderid = parseInt(request.params.riderid)
  pool.query(
    'SELECT R1.riderid, EXTRACT(month FROM O.orderTime) as month, COUNT(distinct O.orderid) as numberOfOrders, ' +
    // 'COALESCE((EXTRACT(EPOCH FROM (arrivaltime-assigntime))/3600), (EXTRACT(EPOCH FROM (NOW()-assigntime))/3600)) as hoursDuration, ' +
    'SUM(O.deliveryfee) as totalDeliveryFees, AVG((EXTRACT(EPOCH FROM (O.deliverytime-O.arrivaltime))/216000)) as averageDeliveryTime ' +
    'FROM Orders AS O, Riders AS R1, Reviews AS R2 ' +
    'WHERE R1.riderid = O.riderid ' +
    'AND R2.orderid = O.orderid ' +
    'AND R1.riderid = $1' +
    'GROUP BY R1.riderid, EXTRACT(month FROM O.orderTime)', [riderid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

// Add query functions here:
module.exports = {
  monthlyOrdersAndCost,
  customerList,
  restaurantList,
  getCustomer,
  addCustomer,
  addStaff,
  deleteCustomer,
  updateCustomer,
  addRider,
  updateRider,
  deleteFulltimer,
  deleteParttimer,
  foodList,
  reviewList,
  addFood,
  getFood,
  assignFood,
  updateFood,
  hourlyOrderSummary,
  monthlyCustomerOrderAndCost,
  monthlyDeliverySummary,
  monthlyRiderSummary,
  monthlySpecificRiderSummary,
  monthlyRestaurantSummary,
  promotionsSummary,
  topFiveFoodItems,
  promotionsList
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
