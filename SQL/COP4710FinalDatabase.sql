DROP DATABASE PortManagement;
CREATE DATABASE PortManagement;
USE PortManagement;

# Entity Tables
# Contains all berths ships can dock at
CREATE TABLE IF NOT EXISTS Berths (
	berth_id INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (berth_id)
);

# Contains all registered ships
CREATE TABLE IF NOT EXISTS Ships (
	ship_id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(100),
	PRIMARY KEY (ship_id),
	UNIQUE (name)
);

# Contains all storage areas
CREATE TABLE IF NOT EXISTS StorageAreas (
	storage_id INTEGER NOT NULL AUTO_INCREMENT,
	capacity INTEGER NOT NULL,
	address VARCHAR(20) NOT NULL,
	PRIMARY KEY (storage_id),
	UNIQUE (address),
	CONSTRAINT capacityLimits
		CHECK (capacity >= 0 AND capacity <= 50)
);

# Contains all registered trucks
CREATE TABLE IF NOT EXISTS Trucks (
	truck_id INTEGER NOT NULL AUTO_INCREMENT,
	license VARCHAR(8) NOT NULL,
	PRIMARY KEY (truck_id),
	UNIQUE (license)
);

# Contains all registered containers
CREATE TABLE IF NOT EXISTS Containers (
	container_id INTEGER NOT NULL AUTO_INCREMENT,
    company VARCHAR(50),
    PRIMARY KEY (container_id)
);

# Relational Tables
# Table for ships docked at berths
CREATE TABLE IF NOT EXISTS Docked_At (
	docking_id INTEGER NOT NULL AUTO_INCREMENT,
	berth_id INTEGER NOT NULL,
    ship_id INTEGER NOT NULL,
    PRIMARY KEY (docking_id),
    FOREIGN KEY (berth_id) REFERENCES Berths(berth_id),
    FOREIGN KEY (ship_id) REFERENCES Ships(ship_id),
    UNIQUE (berth_id),
    UNIQUE (ship_id)
);

# Table for tracking the location of containers
CREATE TABLE IF NOT EXISTS Location (
	container_id INTEGER,
    dest_sid INTEGER,
    dest_tid INTEGER,
    source_sid INTEGER,
    source_tid INTEGER,
    storage_id INTEGER NOT NULL,
    location VARCHAR(12) NOT NULL,
    PRIMARY KEY (container_id),
    FOREIGN KEY (container_id) REFERENCES Containers(container_id),
	FOREIGN KEY (dest_sid)     REFERENCES Ships(ship_id),
	FOREIGN KEY (dest_tid)     REFERENCES Trucks(truck_id),
	FOREIGN KEY (source_sid)   REFERENCES Ships(ship_id),
    FOREIGN KEY (source_tid)   REFERENCES Trucks(truck_id),
	FOREIGN KEY (storage_id)   REFERENCES StorageAreas(storage_id),
    CONSTRAINT source_location
		CHECK (source_sid IS NULL XOR source_tid IS NULL),
	CONSTRAINT final_destination
		CHECK (dest_sid IS NULL XOR dest_tid IS NULL),
	CONSTRAINT location
		CHECK (location IN ('Destination', 'Storage', 'Source'))
);

# Table for tracking what storage area a truck is at
CREATE TABLE IF NOT EXISTS Located_At (
	locating_id INTEGER NOT NULL AUTO_INCREMENT,
	storage_id INTEGER,
    truck_id INTEGER,
    PRIMARY KEY (locating_id),
    FOREIGN KEY (storage_id) REFERENCES StorageAreas(storage_id),
    FOREIGN KEY (truck_id) REFERENCES Trucks(truck_id)
);