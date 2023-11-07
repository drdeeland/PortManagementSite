USE PortManagement;

INSERT INTO Berths VALUES ();
INSERT INTO Berths VALUES ();

SELECT * FROM Berths;

INSERT INTO Ships(name) VALUES
("Gratitude"),
("The Big One"),
("Liberty"),
("Gale"),
("Sapphire"),
("Atlantis"),
("Noah"),
("Neptune"),
("Shark Bait"),
("HammerHead");

SELECT * FROM Ships;

INSERT INTO StorageAreas(capacity, address) VALUES
(34, "9312 NW eastern Blvd, Port Antigua, FL"),
(36, "2345 NW western Blvd, Miami, FL"),
(25, "9483 NW washington Blvd, Cocoa Beach, FL"),
(36, "3843 NW licoln Blvd, San Diego, CA"),
(34, "8493 NW kendal street, New York City, NY"),
(36, "5321 NW galloway Road, Boston, MA"),
(34, "3412 NW glennville street, Miami, FL"),
(36, "2221 NW jackson street, Miami, FL"),
(34, "9374 NW charles Blvd, Cocoa Beach, FL"),
(36, "9237 NW james street, San Diego, CA");

SELECT * FROM StorageAreas;

INSERT INTO Trucks(license) VALUES
('ABC123'),
('ABC234'),
('ABC345'),
('ABC456'),
('ABC567'),
('ABC678'),
('ABC789'),
('BCD123'),
('BCD234'),
('BCD345');

SELECT * FROM Trucks;

INSERT INTO Containers(company) VALUES 
("Nike"),
("Addidas"),
("Facebook"),
("Google"),
("Samsung"),
("Tmobile"),
("Tesla"),
("NASA"),
("SpaceEx"),
("Ford");

SELECT * FROM Containers;

INSERT INTO Docked_At(berth_id, ship_id) VALUES
(1, 1),
(2, 2);

SELECT * FROM Docked_At;

INSERT INTO Location VALUES
(1, 1, NULL, NULL, 1, 1, 'Storage'),
(2, NULL, 1, 1, NULL, 1, 'Source');

SELECT * FROM Location;

INSERT INTO Located_At(storage_id, truck_id) VALUES
(1, 1);

SELECT * FROM Located_At;