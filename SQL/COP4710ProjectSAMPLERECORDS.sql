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
(34, "Row A"),
(36, "Row B"),
(25, "Row C"),
(36, "Row D"),
(34, "Row E"),
(36, "Row F"),
(34, "Row G"),
(36, "Row H"),
(34, "Row I"),
(36, "Row J");

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