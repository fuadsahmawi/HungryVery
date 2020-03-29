/*  TODO:
    Constraints of the tables
    Makes
    Do
    Have
    Delivers
    From
    Employs
    Sells
    Manages
    PartTimeMaintains
    WeeklyWorkSchedule
    FullTimeMaintains
    MonthlyWorkSchedule
*/

CREATE TABLE Customers (
	cid 		    INTEGER,
	cname			VARCHAR(60),
    contact         INTEGER,
    rewardpoints    INTEGER,
	PRIMARY KEY (customerid)
);

CREATE TABLE Restaurants (
	rid 			INTEGER,
	rname 		    VARCHAR(60),
    raddress        VARCHAR(300),
	minOrder        INTEGER,  
	PRIMARY KEY (rid)
);

CREATE TABLE Menu (
	foodid 			INTEGER,
    fname           VARCHAR(60),
	category 		VARCHAR(20),
    amountOrdered   INTEGER,
    orderLimit      INTEGER,
    price           FLOAT,
    available       BOOLEAN,
	PRIMARY KEY (foodid)
);

CREATE TABLE Promotions (
	promoid 		INTEGER,
    pname           VARCHAR(60),
    discount        FLOAT,
    StartDateTime   DATETIME,
    EndDateTime     DATETIME,
	PRIMARY KEY (promoid)
);

CREATE TABLE Reviews (
	reviewid 		INTEGER,
    foodRating      INTEGER,
    foodReview      VARCHAR(200),
    deliveryRating  INTEGER,
    deliveryReview  VARCHAR(200),
	PRIMARY KEY (reviewid)
);

CREATE TABLE Orders (
	orderid 		INTEGER,
	dlocation		VARCHAR(),
	orderTime       DATETIME,
    assignTime      DATETIME,
    arrivalTime     DATETIME,
    departTime      DATETIME,
    deliveryTime    DATETIME,
    deliveryFee     FLOAT,
    totalCost       FLOAT,
	PRIMARY KEY (orderid)
);


CREATE TABLE Riders (
	riderid 		INTEGER,
	riderName       VARCHAR(60),
	vnumber         VARCHAR(10),
	PRIMARY KEY (riderid)
);

CREATE TABLE Staffs (
	staffid			INTEGER,
    sname           VARCHAR(60),
	PRIMARY KEY (staffid)
);

CREATE TABLE Managers (
	mid 			INTEGER,
	mname           VARCHAR(60),
	PRIMARY KEY (mid)
);

CREATE TABLE PartTimer (
	riderid 		INTEGER,
	WeeklyBaseSalary  FLOAT,
	PRIMARY KEY (riderid) references Riders on delete cascade
);

CREATE TABLE FullTimer (
	riderid 		INTEGER,
	MonthlyBaseSalary FLOAT,
	PRIMARY KEY (riderid) references Riders on delete cascade
);