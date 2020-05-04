/*  TODO:
    Constraints of the tables
*/

CREATE TABLE Customers (
	cid 		    SERIAL,
	cname			VARCHAR(60),
    contact         INTEGER,
    rewardpoints    INTEGER,
	PRIMARY KEY (cid)
);

CREATE TABLE Restaurants (
	rid 			SERIAL,
	rname 		    VARCHAR(60),
    raddress        VARCHAR(300),
	minOrder        INTEGER,  
	PRIMARY KEY (rid)
);

CREATE TABLE Food (
	foodid 			SERIAL,
    fname           VARCHAR(60),
	category 		VARCHAR(20),
    amountOrdered   INTEGER,
    orderLimit      INTEGER,
    price           FLOAT,
    available       BOOLEAN,
	PRIMARY KEY (foodid)
);

CREATE TABLE Promotions (
	promoid 		SERIAL,
    pname           VARCHAR(60),
    discount        FLOAT,
    StartDateTime   TIMESTAMP,
    EndDateTime     TIMESTAMP,
	PRIMARY KEY (promoid)
);

CREATE TABLE Managers (
	mid 			SERIAL,
	mname           VARCHAR(60),
	PRIMARY KEY (mid)
);

CREATE TABLE Riders (
	riderid 		SERIAL,
	riderName       VARCHAR(60),
	vnumber         VARCHAR(10),
	mid 			INTEGER not null,
	PRIMARY KEY (riderid),
	FOREIGN KEY (mid) references Managers
);

CREATE TABLE Orders (
	orderid 		SERIAL,
	dlocation		VARCHAR(200),
	orderTime       TIMESTAMP,
    assignTime      TIMESTAMP,
    arrivalTime     TIMESTAMP,
    departTime      TIMESTAMP,
    deliveryTime    TIMESTAMP,
    deliveryFee     FLOAT,
    totalCost       FLOAT,
    rid 			INTEGER not null,
    riderid			INTEGER not null,
	PRIMARY KEY (orderid),
	FOREIGN KEY (rid) references Restaurants,
	FOREIGN KEY (riderid) references Riders
);

CREATE TABLE Reviews (
	reviewid 		SERIAL,
    foodRating      INTEGER,
    foodReview      VARCHAR(200),
    deliveryRating  INTEGER,
    deliveryReview  VARCHAR(200),
    cid 			INTEGER,
    orderid			INTEGER,
	PRIMARY KEY (reviewid),
	FOREIGN KEY (cid) references Customers on delete cascade,
	FOREIGN KEY (orderid) references Orders on delete cascade
);

CREATE TABLE Staffs (
	staffid			SERIAL,
    sname           VARCHAR(60),
    rid    			INTEGER not null,
	PRIMARY KEY (staffid),
	FOREIGN KEY (rid) references Restaurants
);

CREATE TABLE PartTimer (
	riderid 		INTEGER,
	WeeklyBaseSalary  FLOAT,
	PRIMARY KEY (riderid),
	FOREIGN KEY (riderid) references Riders on delete cascade
);

CREATE TABLE FullTimer (
	riderid 		INTEGER,
	MonthlyBaseSalary FLOAT,
	PRIMARY KEY (riderid),
	FOREIGN KEY (riderid) references Riders on delete cascade
);

CREATE TABLE CreditCard (
	cardid			SERIAL,
	cardnumber		INTEGER,
	cid 			INTEGER not null,
	PRIMARY KEY (cardid),
	FOREIGN KEY (cid) references Customers on delete cascade
);

CREATE TABLE MaintainsPT (
	day				VARCHAR(10),
	StartTime       TIMESTAMP,
	EndTime 		TIMESTAMP,
	riderid			INTEGER,
	FOREIGN KEY (riderid) references Riders on delete cascade
);

CREATE TABLE MaintainsFT (
	Month 			VARCHAR(10),
	Year			INTEGER,
	StartDay		VARCHAR(10),
	Shift			INTEGER,
	riderid			INTEGER,
	FOREIGN KEY (riderid) references Riders on delete cascade
);

CREATE TABLE Makes (
	cid 			INTEGER,
	orderid			INTEGER,
	foodid			INTEGER,
	amount          INTEGER,
	FOREIGN KEY (cid) references Customers,
	FOREIGN KEY (orderid) references Orders,
	FOREIGN KEY (foodid) references Food
);

CREATE TABLE Sells (
	foodid			INTEGER,
	promoid			INTEGER,
	rid 			INTEGER,
	PRIMARY KEY (foodid),
	FOREIGN KEY (foodid) references Food,
	FOREIGN KEY (promoid) references Promotions,
	FOREIGN KEY (rid) references Restaurants
);
