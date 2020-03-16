-- Create base and solution tables. Load data into solution tables.


DROP VIEW IF EXISTS zzsolution, zzanswer CASCADE;
DROP VIEW IF EXISTS v1, v2, v3, v4, v5, v6, v7, v8, v9, v10 CASCADE;
DROP TABLE IF EXISTS zzSummary CASCADE;
DROP TABLE IF EXISTS Specializes CASCADE;
DROP TABLE IF EXISTS Areas CASCADE;
DROP TABLE IF EXISTS Works CASCADE;
DROP TABLE IF EXISTS Projects CASCADE;
DROP TABLE IF EXISTS Managers CASCADE;
DROP TABLE IF EXISTS Engineers CASCADE;
DROP TABLE IF EXISTS Employees CASCADE;
DROP TABLE IF EXISTS Departments CASCADE;
DROP TABLE IF EXISTS Offices CASCADE;

CREATE TABLE zzSummary (
	status		TEXT
);


CREATE TABLE Offices (
	oid 			INTEGER,
	address			VARCHAR(60),
	PRIMARY KEY (oid)
);

-- eid = eid of department's manager
CREATE TABLE Departments (
	did 			INTEGER,
	dbudget 		INTEGER NOT NULL,
	oid 			INTEGER NOT NULL,
	eid 			INTEGER NOT NULL,  
	PRIMARY KEY (did),
	FOREIGN KEY (oid) REFERENCES Offices 
);

CREATE TABLE Employees (
	eid 			INTEGER,
	did 			INTEGER NOT NULL,
	PRIMARY KEY (eid),
	FOREIGN KEY (did) REFERENCES Departments 
);

CREATE TABLE Engineers (
	eid 			INTEGER,
	PRIMARY KEY (eid),
	FOREIGN KEY (eid) REFERENCES Employees 
);

CREATE TABLE Managers (
	eid 			INTEGER,
	PRIMARY KEY (eid),
	FOREIGN KEY (eid) REFERENCES Employees 
);


-- eid = eid of project's supervisor 
CREATE TABLE Projects (
	pid 			INTEGER,
	pbudget			INTEGER NOT NULL,
	eid 			INTEGER NOT NULL,
	PRIMARY KEY (pid),
	FOREIGN KEY (eid) REFERENCES Managers
);


CREATE TABLE Works (
	pid 			INTEGER,
	eid 			INTEGER,
	hours 			INTEGER NOT NULL,
	PRIMARY KEY (pid,eid),
	FOREIGN KEY (eid) REFERENCES Engineers,
	FOREIGN KEY (pid) REFERENCES Projects
);

CREATE TABLE Areas (
	aid 			VARCHAR(5),
	PRIMARY KEY (aid)
);

CREATE TABLE Specializes (
	eid 			INTEGER,
	aid 			VARCHAR(5),
	PRIMARY KEY (eid,aid),
	FOREIGN KEY (eid) REFERENCES Employees,
	FOREIGN KEY (aid) REFERENCES Areas
);


DROP VIEW IF EXISTS zzsolution CASCADE;
DROP TABLE IF EXISTS zzdb1q1 CASCADE;
DROP TABLE IF EXISTS zzdb1q2 CASCADE;
DROP TABLE IF EXISTS zzdb1q3 CASCADE;
DROP TABLE IF EXISTS zzdb1q4 CASCADE;
DROP TABLE IF EXISTS zzdb1q5 CASCADE;
DROP TABLE IF EXISTS zzdb1q6 CASCADE;
DROP TABLE IF EXISTS zzdb1q7 CASCADE;
DROP TABLE IF EXISTS zzdb1q8 CASCADE;
DROP TABLE IF EXISTS zzdb1q9 CASCADE;
DROP TABLE IF EXISTS zzdb1q10 CASCADE;

DROP TABLE IF EXISTS zzdb2q1 CASCADE;
DROP TABLE IF EXISTS zzdb2q2 CASCADE;
DROP TABLE IF EXISTS zzdb2q3 CASCADE;
DROP TABLE IF EXISTS zzdb2q4 CASCADE;
DROP TABLE IF EXISTS zzdb2q5 CASCADE;
DROP TABLE IF EXISTS zzdb2q6 CASCADE;
DROP TABLE IF EXISTS zzdb2q7 CASCADE;
DROP TABLE IF EXISTS zzdb2q8 CASCADE;
DROP TABLE IF EXISTS zzdb2q9 CASCADE;
DROP TABLE IF EXISTS zzdb2q10 CASCADE;

DROP TABLE IF EXISTS zzdb3q1 CASCADE;
DROP TABLE IF EXISTS zzdb3q2 CASCADE;
DROP TABLE IF EXISTS zzdb3q3 CASCADE;
DROP TABLE IF EXISTS zzdb3q4 CASCADE;
DROP TABLE IF EXISTS zzdb3q5 CASCADE;
DROP TABLE IF EXISTS zzdb3q6 CASCADE;
DROP TABLE IF EXISTS zzdb3q7 CASCADE;
DROP TABLE IF EXISTS zzdb3q8 CASCADE;
DROP TABLE IF EXISTS zzdb3q9 CASCADE;
DROP TABLE IF EXISTS zzdb3q10 CASCADE;

DROP TABLE IF EXISTS zzdb4q1 CASCADE;
DROP TABLE IF EXISTS zzdb4q2 CASCADE;
DROP TABLE IF EXISTS zzdb4q3 CASCADE;
DROP TABLE IF EXISTS zzdb4q4 CASCADE;
DROP TABLE IF EXISTS zzdb4q5 CASCADE;
DROP TABLE IF EXISTS zzdb4q6 CASCADE;
DROP TABLE IF EXISTS zzdb4q7 CASCADE;
DROP TABLE IF EXISTS zzdb4q8 CASCADE;
DROP TABLE IF EXISTS zzdb4q9 CASCADE;
DROP TABLE IF EXISTS zzdb4q10 CASCADE;

DROP TABLE IF EXISTS zzdb5q1 CASCADE;
DROP TABLE IF EXISTS zzdb5q2 CASCADE;
DROP TABLE IF EXISTS zzdb5q3 CASCADE;
DROP TABLE IF EXISTS zzdb5q4 CASCADE;
DROP TABLE IF EXISTS zzdb5q5 CASCADE;
DROP TABLE IF EXISTS zzdb5q6 CASCADE;
DROP TABLE IF EXISTS zzdb5q7 CASCADE;
DROP TABLE IF EXISTS zzdb5q8 CASCADE;
DROP TABLE IF EXISTS zzdb5q9 CASCADE;
DROP TABLE IF EXISTS zzdb5q10 CASCADE;

DROP TABLE IF EXISTS zzdb6q1 CASCADE;
DROP TABLE IF EXISTS zzdb6q2 CASCADE;
DROP TABLE IF EXISTS zzdb6q3 CASCADE;
DROP TABLE IF EXISTS zzdb6q4 CASCADE;
DROP TABLE IF EXISTS zzdb6q5 CASCADE;
DROP TABLE IF EXISTS zzdb6q6 CASCADE;
DROP TABLE IF EXISTS zzdb6q7 CASCADE;
DROP TABLE IF EXISTS zzdb6q8 CASCADE;
DROP TABLE IF EXISTS zzdb6q9 CASCADE;
DROP TABLE IF EXISTS zzdb6q10 CASCADE;

DROP TABLE IF EXISTS zzdb7q1 CASCADE;
DROP TABLE IF EXISTS zzdb7q2 CASCADE;
DROP TABLE IF EXISTS zzdb7q3 CASCADE;
DROP TABLE IF EXISTS zzdb7q4 CASCADE;
DROP TABLE IF EXISTS zzdb7q5 CASCADE;
DROP TABLE IF EXISTS zzdb7q6 CASCADE;
DROP TABLE IF EXISTS zzdb7q7 CASCADE;
DROP TABLE IF EXISTS zzdb7q8 CASCADE;
DROP TABLE IF EXISTS zzdb7q9 CASCADE;
DROP TABLE IF EXISTS zzdb7q10 CASCADE;







CREATE TABLE zzdb1q1 (
    eid integer
);



CREATE TABLE zzdb1q10 (
    eid integer
);



CREATE TABLE zzdb1q2 (
    eid integer
);



CREATE TABLE zzdb1q3 (
    eid integer
);



CREATE TABLE zzdb1q4 (
    eid integer
);



CREATE TABLE zzdb1q5 (
    eid integer
);



CREATE TABLE zzdb1q6 (
    eid integer,
    num integer
);



CREATE TABLE zzdb1q7 (
    pid integer,
    eid integer,
    eid2 integer
);



CREATE TABLE zzdb1q8 (
    aid character varying(5),
    num integer
);



CREATE TABLE zzdb1q9 (
    pid integer
);



CREATE TABLE zzdb2q1 (
    eid integer
);



CREATE TABLE zzdb2q10 (
    eid integer
);



CREATE TABLE zzdb2q2 (
    eid integer
);



CREATE TABLE zzdb2q3 (
    eid integer
);



CREATE TABLE zzdb2q4 (
    eid integer
);



CREATE TABLE zzdb2q5 (
    eid integer
);



CREATE TABLE zzdb2q6 (
    eid integer,
    num integer
);



CREATE TABLE zzdb2q7 (
    pid integer,
    eid integer,
    eid2 integer
);



CREATE TABLE zzdb2q8 (
    aid character varying(5),
    num integer
);



CREATE TABLE zzdb2q9 (
    pid integer
);



CREATE TABLE zzdb3q1 (
    eid integer
);



CREATE TABLE zzdb3q10 (
    eid integer
);



CREATE TABLE zzdb3q2 (
    eid integer
);



CREATE TABLE zzdb3q3 (
    eid integer
);



CREATE TABLE zzdb3q4 (
    eid integer
);



CREATE TABLE zzdb3q5 (
    eid integer
);



CREATE TABLE zzdb3q6 (
    eid integer,
    num integer
);



CREATE TABLE zzdb3q7 (
    pid integer,
    eid integer,
    eid2 integer
);



CREATE TABLE zzdb3q8 (
    aid character varying(5),
    num integer
);



CREATE TABLE zzdb3q9 (
    pid integer
);



CREATE TABLE zzdb4q1 (
    eid integer
);



CREATE TABLE zzdb4q10 (
    eid integer
);



CREATE TABLE zzdb4q2 (
    eid integer
);



CREATE TABLE zzdb4q3 (
    eid integer
);



CREATE TABLE zzdb4q4 (
    eid integer
);



CREATE TABLE zzdb4q5 (
    eid integer
);



CREATE TABLE zzdb4q6 (
    eid integer,
    num integer
);



CREATE TABLE zzdb4q7 (
    pid integer,
    eid integer,
    eid2 integer
);



CREATE TABLE zzdb4q8 (
    aid character varying(5),
    num integer
);



CREATE TABLE zzdb4q9 (
    pid integer
);



CREATE TABLE zzdb5q1 (
    eid integer
);



CREATE TABLE zzdb5q10 (
    eid integer
);



CREATE TABLE zzdb5q2 (
    eid integer
);



CREATE TABLE zzdb5q3 (
    eid integer
);



CREATE TABLE zzdb5q4 (
    eid integer
);



CREATE TABLE zzdb5q5 (
    eid integer
);



CREATE TABLE zzdb5q6 (
    eid integer,
    num integer
);



CREATE TABLE zzdb5q7 (
    pid integer,
    eid integer,
    eid2 integer
);



CREATE TABLE zzdb5q8 (
    aid character varying(5),
    num integer
);



CREATE TABLE zzdb5q9 (
    pid integer
);



CREATE TABLE zzdb6q1 (
    eid integer
);



CREATE TABLE zzdb6q10 (
    eid integer
);



CREATE TABLE zzdb6q2 (
    eid integer
);



CREATE TABLE zzdb6q3 (
    eid integer
);



CREATE TABLE zzdb6q4 (
    eid integer
);



CREATE TABLE zzdb6q5 (
    eid integer
);



CREATE TABLE zzdb6q6 (
    eid integer,
    num integer
);



CREATE TABLE zzdb6q7 (
    pid integer,
    eid integer,
    eid2 integer
);



CREATE TABLE zzdb6q8 (
    aid character varying(5),
    num integer
);



CREATE TABLE zzdb6q9 (
    pid integer
);



CREATE TABLE zzdb7q1 (
    eid integer
);



CREATE TABLE zzdb7q10 (
    eid integer
);



CREATE TABLE zzdb7q2 (
    eid integer
);



CREATE TABLE zzdb7q3 (
    eid integer
);



CREATE TABLE zzdb7q4 (
    eid integer
);



CREATE TABLE zzdb7q5 (
    eid integer
);



CREATE TABLE zzdb7q6 (
    eid integer,
    num integer
);



CREATE TABLE zzdb7q7 (
    pid integer,
    eid integer,
    eid2 integer
);



CREATE TABLE zzdb7q8 (
    aid character varying(5),
    num integer
);



CREATE TABLE zzdb7q9 (
    pid integer
);



INSERT INTO zzdb1q1 (eid) VALUES (101);
INSERT INTO zzdb1q1 (eid) VALUES (105);
INSERT INTO zzdb1q1 (eid) VALUES (109);



INSERT INTO zzdb1q10 (eid) VALUES (100);



INSERT INTO zzdb1q2 (eid) VALUES (101);



INSERT INTO zzdb1q3 (eid) VALUES (100);
INSERT INTO zzdb1q3 (eid) VALUES (101);
INSERT INTO zzdb1q3 (eid) VALUES (102);
INSERT INTO zzdb1q3 (eid) VALUES (104);
INSERT INTO zzdb1q3 (eid) VALUES (105);
INSERT INTO zzdb1q3 (eid) VALUES (106);
INSERT INTO zzdb1q3 (eid) VALUES (107);
INSERT INTO zzdb1q3 (eid) VALUES (108);
INSERT INTO zzdb1q3 (eid) VALUES (109);



INSERT INTO zzdb1q4 (eid) VALUES (104);






INSERT INTO zzdb1q6 (eid, num) VALUES (100, 1);
INSERT INTO zzdb1q6 (eid, num) VALUES (101, 2);
INSERT INTO zzdb1q6 (eid, num) VALUES (102, 0);
INSERT INTO zzdb1q6 (eid, num) VALUES (103, 1);
INSERT INTO zzdb1q6 (eid, num) VALUES (104, 2);
INSERT INTO zzdb1q6 (eid, num) VALUES (105, 1);
INSERT INTO zzdb1q6 (eid, num) VALUES (106, 0);
INSERT INTO zzdb1q6 (eid, num) VALUES (107, 0);
INSERT INTO zzdb1q6 (eid, num) VALUES (108, 1);
INSERT INTO zzdb1q6 (eid, num) VALUES (109, 2);
INSERT INTO zzdb1q6 (eid, num) VALUES (110, 2);



INSERT INTO zzdb1q7 (pid, eid, eid2) VALUES (3, 101, 109);



INSERT INTO zzdb1q8 (aid, num) VALUES ('A', 1);
INSERT INTO zzdb1q8 (aid, num) VALUES ('B', 2);
INSERT INTO zzdb1q8 (aid, num) VALUES ('C', 1);
INSERT INTO zzdb1q8 (aid, num) VALUES ('D', 0);



INSERT INTO zzdb1q9 (pid) VALUES (2);






INSERT INTO zzdb2q10 (eid) VALUES (100);
INSERT INTO zzdb2q10 (eid) VALUES (103);
INSERT INTO zzdb2q10 (eid) VALUES (104);



INSERT INTO zzdb2q2 (eid) VALUES (101);



INSERT INTO zzdb2q3 (eid) VALUES (100);
INSERT INTO zzdb2q3 (eid) VALUES (101);
INSERT INTO zzdb2q3 (eid) VALUES (102);
INSERT INTO zzdb2q3 (eid) VALUES (104);
INSERT INTO zzdb2q3 (eid) VALUES (105);
INSERT INTO zzdb2q3 (eid) VALUES (106);
INSERT INTO zzdb2q3 (eid) VALUES (107);
INSERT INTO zzdb2q3 (eid) VALUES (108);
INSERT INTO zzdb2q3 (eid) VALUES (109);



INSERT INTO zzdb2q4 (eid) VALUES (100);
INSERT INTO zzdb2q4 (eid) VALUES (103);
INSERT INTO zzdb2q4 (eid) VALUES (104);






INSERT INTO zzdb2q6 (eid, num) VALUES (100, 2);
INSERT INTO zzdb2q6 (eid, num) VALUES (101, 0);
INSERT INTO zzdb2q6 (eid, num) VALUES (102, 0);
INSERT INTO zzdb2q6 (eid, num) VALUES (103, 0);
INSERT INTO zzdb2q6 (eid, num) VALUES (104, 2);
INSERT INTO zzdb2q6 (eid, num) VALUES (105, 0);
INSERT INTO zzdb2q6 (eid, num) VALUES (106, 0);
INSERT INTO zzdb2q6 (eid, num) VALUES (107, 0);
INSERT INTO zzdb2q6 (eid, num) VALUES (108, 0);
INSERT INTO zzdb2q6 (eid, num) VALUES (109, 0);
INSERT INTO zzdb2q6 (eid, num) VALUES (110, 0);






INSERT INTO zzdb2q8 (aid, num) VALUES ('A', 1);
INSERT INTO zzdb2q8 (aid, num) VALUES ('B', 2);
INSERT INTO zzdb2q8 (aid, num) VALUES ('C', 1);
INSERT INTO zzdb2q8 (aid, num) VALUES ('D', 0);












INSERT INTO zzdb3q2 (eid) VALUES (101);
INSERT INTO zzdb3q2 (eid) VALUES (103);
INSERT INTO zzdb3q2 (eid) VALUES (104);
INSERT INTO zzdb3q2 (eid) VALUES (108);



INSERT INTO zzdb3q3 (eid) VALUES (100);
INSERT INTO zzdb3q3 (eid) VALUES (101);
INSERT INTO zzdb3q3 (eid) VALUES (102);
INSERT INTO zzdb3q3 (eid) VALUES (104);
INSERT INTO zzdb3q3 (eid) VALUES (105);
INSERT INTO zzdb3q3 (eid) VALUES (106);
INSERT INTO zzdb3q3 (eid) VALUES (107);
INSERT INTO zzdb3q3 (eid) VALUES (108);
INSERT INTO zzdb3q3 (eid) VALUES (109);









INSERT INTO zzdb3q6 (eid, num) VALUES (100, 1);
INSERT INTO zzdb3q6 (eid, num) VALUES (101, 2);
INSERT INTO zzdb3q6 (eid, num) VALUES (102, 0);
INSERT INTO zzdb3q6 (eid, num) VALUES (103, 1);
INSERT INTO zzdb3q6 (eid, num) VALUES (104, 2);
INSERT INTO zzdb3q6 (eid, num) VALUES (105, 1);
INSERT INTO zzdb3q6 (eid, num) VALUES (106, 0);
INSERT INTO zzdb3q6 (eid, num) VALUES (107, 0);
INSERT INTO zzdb3q6 (eid, num) VALUES (108, 1);
INSERT INTO zzdb3q6 (eid, num) VALUES (109, 2);
INSERT INTO zzdb3q6 (eid, num) VALUES (110, 2);



INSERT INTO zzdb3q7 (pid, eid, eid2) VALUES (3, 101, 109);



INSERT INTO zzdb3q8 (aid, num) VALUES ('A', 3);
INSERT INTO zzdb3q8 (aid, num) VALUES ('B', 4);
INSERT INTO zzdb3q8 (aid, num) VALUES ('C', 3);
INSERT INTO zzdb3q8 (aid, num) VALUES ('D', 2);
INSERT INTO zzdb3q8 (aid, num) VALUES ('E', 1);



INSERT INTO zzdb3q9 (pid) VALUES (2);



INSERT INTO zzdb4q1 (eid) VALUES (105);



INSERT INTO zzdb4q10 (eid) VALUES (103);



INSERT INTO zzdb4q2 (eid) VALUES (101);
INSERT INTO zzdb4q2 (eid) VALUES (106);






INSERT INTO zzdb4q4 (eid) VALUES (104);



INSERT INTO zzdb4q5 (eid) VALUES (101);
INSERT INTO zzdb4q5 (eid) VALUES (108);



INSERT INTO zzdb4q6 (eid, num) VALUES (100, 2);
INSERT INTO zzdb4q6 (eid, num) VALUES (101, 2);
INSERT INTO zzdb4q6 (eid, num) VALUES (102, 0);
INSERT INTO zzdb4q6 (eid, num) VALUES (103, 0);
INSERT INTO zzdb4q6 (eid, num) VALUES (104, 2);
INSERT INTO zzdb4q6 (eid, num) VALUES (105, 1);
INSERT INTO zzdb4q6 (eid, num) VALUES (106, 0);
INSERT INTO zzdb4q6 (eid, num) VALUES (107, 0);
INSERT INTO zzdb4q6 (eid, num) VALUES (108, 1);
INSERT INTO zzdb4q6 (eid, num) VALUES (109, 2);
INSERT INTO zzdb4q6 (eid, num) VALUES (110, 2);



INSERT INTO zzdb4q7 (pid, eid, eid2) VALUES (3, 101, 109);



INSERT INTO zzdb4q8 (aid, num) VALUES ('A', 2);
INSERT INTO zzdb4q8 (aid, num) VALUES ('B', 2);
INSERT INTO zzdb4q8 (aid, num) VALUES ('C', 1);
INSERT INTO zzdb4q8 (aid, num) VALUES ('D', 0);
INSERT INTO zzdb4q8 (aid, num) VALUES ('E', 0);
INSERT INTO zzdb4q8 (aid, num) VALUES ('F', 4);



INSERT INTO zzdb4q9 (pid) VALUES (2);



INSERT INTO zzdb5q1 (eid) VALUES (101);
INSERT INTO zzdb5q1 (eid) VALUES (105);
INSERT INTO zzdb5q1 (eid) VALUES (109);






INSERT INTO zzdb5q2 (eid) VALUES (101);



INSERT INTO zzdb5q3 (eid) VALUES (100);
INSERT INTO zzdb5q3 (eid) VALUES (101);
INSERT INTO zzdb5q3 (eid) VALUES (102);
INSERT INTO zzdb5q3 (eid) VALUES (104);
INSERT INTO zzdb5q3 (eid) VALUES (105);
INSERT INTO zzdb5q3 (eid) VALUES (106);
INSERT INTO zzdb5q3 (eid) VALUES (107);
INSERT INTO zzdb5q3 (eid) VALUES (108);
INSERT INTO zzdb5q3 (eid) VALUES (109);



INSERT INTO zzdb5q4 (eid) VALUES (104);






INSERT INTO zzdb5q6 (eid, num) VALUES (100, 1);
INSERT INTO zzdb5q6 (eid, num) VALUES (101, 2);
INSERT INTO zzdb5q6 (eid, num) VALUES (102, 0);
INSERT INTO zzdb5q6 (eid, num) VALUES (103, 1);
INSERT INTO zzdb5q6 (eid, num) VALUES (104, 2);
INSERT INTO zzdb5q6 (eid, num) VALUES (105, 1);
INSERT INTO zzdb5q6 (eid, num) VALUES (106, 0);
INSERT INTO zzdb5q6 (eid, num) VALUES (107, 0);
INSERT INTO zzdb5q6 (eid, num) VALUES (108, 1);
INSERT INTO zzdb5q6 (eid, num) VALUES (109, 2);
INSERT INTO zzdb5q6 (eid, num) VALUES (110, 2);






INSERT INTO zzdb5q8 (aid, num) VALUES ('A', 1);
INSERT INTO zzdb5q8 (aid, num) VALUES ('B', 2);
INSERT INTO zzdb5q8 (aid, num) VALUES ('C', 1);
INSERT INTO zzdb5q8 (aid, num) VALUES ('D', 0);



INSERT INTO zzdb5q9 (pid) VALUES (2);






INSERT INTO zzdb6q10 (eid) VALUES (100);
INSERT INTO zzdb6q10 (eid) VALUES (103);
INSERT INTO zzdb6q10 (eid) VALUES (104);



INSERT INTO zzdb6q2 (eid) VALUES (101);



INSERT INTO zzdb6q3 (eid) VALUES (100);
INSERT INTO zzdb6q3 (eid) VALUES (101);
INSERT INTO zzdb6q3 (eid) VALUES (102);
INSERT INTO zzdb6q3 (eid) VALUES (104);
INSERT INTO zzdb6q3 (eid) VALUES (105);
INSERT INTO zzdb6q3 (eid) VALUES (106);
INSERT INTO zzdb6q3 (eid) VALUES (107);
INSERT INTO zzdb6q3 (eid) VALUES (108);
INSERT INTO zzdb6q3 (eid) VALUES (109);



INSERT INTO zzdb6q4 (eid) VALUES (100);
INSERT INTO zzdb6q4 (eid) VALUES (103);
INSERT INTO zzdb6q4 (eid) VALUES (104);






INSERT INTO zzdb6q6 (eid, num) VALUES (100, 2);
INSERT INTO zzdb6q6 (eid, num) VALUES (101, 0);
INSERT INTO zzdb6q6 (eid, num) VALUES (102, 0);
INSERT INTO zzdb6q6 (eid, num) VALUES (103, 0);
INSERT INTO zzdb6q6 (eid, num) VALUES (104, 2);
INSERT INTO zzdb6q6 (eid, num) VALUES (105, 0);
INSERT INTO zzdb6q6 (eid, num) VALUES (106, 0);
INSERT INTO zzdb6q6 (eid, num) VALUES (107, 0);
INSERT INTO zzdb6q6 (eid, num) VALUES (108, 0);
INSERT INTO zzdb6q6 (eid, num) VALUES (109, 0);
INSERT INTO zzdb6q6 (eid, num) VALUES (110, 0);






INSERT INTO zzdb6q8 (aid, num) VALUES ('A', 1);
INSERT INTO zzdb6q8 (aid, num) VALUES ('B', 2);
INSERT INTO zzdb6q8 (aid, num) VALUES ('C', 1);
INSERT INTO zzdb6q8 (aid, num) VALUES ('D', 0);









INSERT INTO zzdb7q10 (eid) VALUES (100);






INSERT INTO zzdb7q3 (eid) VALUES (100);



INSERT INTO zzdb7q4 (eid) VALUES (100);






INSERT INTO zzdb7q6 (eid, num) VALUES (100, 1);












