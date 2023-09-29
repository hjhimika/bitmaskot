# bitmaskot

## Requirements
- Java 17+
- Node 18+ (with NPM)
- MySQL 8+

## MySQL Setup
Create a database named `bitmaskot` and grant all privileges to the user.
```sql
CREATE DATABASE IF NOT EXISTS bitmaskot;
```
Create a database user `bitmaskot` with password `bitmaskot` and grant all privileges to the user.
```sql
CREATE USER 'bitmaskot'@'localhost' IDENTIFIED BY 'bitmaskot';
GRANT ALL PRIVILEGES ON bitmaskot.* TO 'bitmaskot'@'localhost';
```

## How to run
To run the backend
```bash
cd bitmaskot-backend
./mvnw spring-boot:run
```

To run the frontend
```bash
npm install
npm start
```
