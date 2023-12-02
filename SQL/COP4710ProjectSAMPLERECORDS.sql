USE PortManagement;

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

INSERT INTO Berths(ship_id) VALUES (1);
INSERT INTO Berths(ship_id) VALUES (2);
INSERT INTO Berths VALUES ();
INSERT INTO Berths VALUES ();
INSERT INTO Berths VALUES ();

SELECT * FROM Berths;

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

INSERT INTO Trucks(license, storage_id) VALUES 
('ABC123', 1),
('ABC234', 2),
('ABC345', 3),
('ABC456', 4),
('ABC567', 5),
('ABC678', 6),
('ABC789', 7),
('BCD123', 8),
('BCD234', 9),
('BCD345', 1);

INSERT INTO Container_Location VALUES
(1, 'Adidas', 1, NULL, NULL, 1, 1, 'Storage'),
(2, 'Adidas', NULL, 1, 1, NULL, 1, 'Source');

SELECT * FROM Container_Location;