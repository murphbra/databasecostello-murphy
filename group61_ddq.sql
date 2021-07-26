CREATE TABLE Properties (propertyID int auto_increment not null, propAddress varchar(255) not null, primary key(propertyID), constraint prop_ID unique(propertyID));
CREATE TABLE CompletedLandscapingSessions (sessionID int auto_increment not null, sessionDate date not null, primary key(sessionID), propertyID int not null, foreign key (propertyID) references Properties(propertyID),constraint sess_ID unique(sessionID));
CREATE TABLE PropertyOwners (ownerID int auto_increment not null, fname varchar(255) not null, lname varchar(255) not null, email varchar(255) not null, primary key(ownerID), constraint own_ID unique(ownerID));
CREATE TABLE CrewLeaders (leaderID int auto_increment not null, fname varchar(255) not null, lname varchar(255) not null, phoneNumber int not null, primary key(leaderID), propertyID int not null, foreign key (propertyID) references Properties(propertyID), constraint lead_ID unique(leaderID)); 
CREATE TABLE Employees (employeeID int auto_increment not null, fname varchar(255) not null, lname varchar(255) not null, phoneNumber int not null, primary key(employeeID), leaderID int not null, foreign key(leaderID) references CrewLeaders(leaderID), constraint emp_ID unique(employeeID)); 
CREATE TABLE PropertyOwned (propertyID int not null, ownerID int not null, primary key(propertyID, ownerID), constraint prop_ID unique(propertyID), foreign key fk_prop(propertyID) references Properties(propertyID), foreign key fk_own(ownerID) references PropertyOwners(ownerID)); 

INSERT INTO Properties (propAddress) VALUES
("123 South Street"), 
("456 North Main Street");

INSERT INTO CompletedLandscapingSessions (propertyID, sessionDate) VALUES
(1, "2021-05-21"), 
(2, "2021-06-17");

INSERT INTO PropertyOwners (fname, lname, email) VALUES
("John", "Smith", "johnsmith@gmail.com"),
("Jane", "Doe", "janedoe@yahoo.com");

INSERT INTO CrewLeaders (fname, lname, phoneNumber, propertyID) VALUES
("Brayden", "Murphy", "1234567891", 1),
("Joseph", "Costello", "2223334567", 2);

INSERT INTO Employees (fname, lname, phoneNumber, leaderID) VALUES
("Jack", "Hill", "3334445678", 3),
("Jill", "Hill", "5556667891", 4); 

