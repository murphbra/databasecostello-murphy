-- add new property
INSERT INTO Properties (address) VALUES (:addressInput);

-- add new session
INSERT INTO CompletedLandscapingSession (propertyID, date) VALUES (:propertyIDInput, :dateInput);

--add new owner
INSERT INTO PropertyOwners (FirstName, LastName, Email) VALUES (:FirstNameInput, :LastNameInput, :EmailInput);

-- add new crewleader
INSERT INTO CrewLeaders (FirstName, LastName, phoneNumber) VALUES (:FirstNameInput, :LastNameInput, :phoneNumberInput);

--add new employee
INSERT INTO Employees (FirstName, LastName, phoneNumber, leaderID) VALUES (:FirstNameInput, :LastNameInput, :phoneNumberInput, :leaderIDInput);

--add new property owned
INSERT INTO PropertyOwned (ownerID) VALUES (:ownerIDInput);

--update properties
UPDATE Properties SET address = :addressInput;

--update session
UPDATE CompletedLandscapingSession SET propertyID = :propertyIDInput, date = :dateINput;

--update owner
UPDATE PropertyOwners SET FirstName = :FirstNameInput, LastName = :LastNameInput, Email = :EmailInput;

--update crewLeader
UPDATE CrewLeaders SET FirstName = :FirstNameInput, LastName = :LastNameInput, phoneNumber = :phoneNumberInput;

--update employee
UPDATE Employees SET FirstName = :FirstNameInput, LastName = :LastNameInput, phoneNumber = :phoneNumberInput, leaderID = :leaderIDInput;

--update propery owned
UPDATE ProperyOwned SET ownerID = :ownerIDInput;

--delete a property
DELETE from Properties WHERE propertyID = :properyIDInput;

--delete a session
DELETE from CompletedLandscapingSession WHERE sessionID = :sessionIDInput;

--delete a owner
DELETE from PropertyOwners WHERE ownerID = :ownerIDInput;

--delete from crewleader
DELETE from CrewLeaders WHERE leaderID = :leaderIDINput;

--delete from Employees
DELETE from employeeID WHERE employeeID = :employeeIDInput;

--delete property owned, M:M relationship
DELETE from PropertyOwned WHERE propertyId = :propertyIDInput AND ownerID = :ownerIDInput;

--select completed session from propertyId
SELECT sessionID, propertyID, date FROM CompletedLandscapingSession WHERE sessionID = [:propertyIDSearch];



