# Port Management System
This is a LAMP stack website where mock users can complete basic CRUD operations using PHP API endpoints to register and modify ships, trucks, and containers in a MySQL database.

## Project Set-Up & How To Run
1. Install XAMPP, Apache, and MySQL (when installing XAMPP there will be an option to install all three at once).
2. Inside the XAMPP installation folder, find xampp/htdcos/ and create a directory called /dbproj/.
3. Place the project inside /dbproj/. Open the XAMPP Control Panel and start Apache and MySQL.
4. On MySQL, click Admin and create a new database called "portmanagement".
5. In "portmanagement" click Import and select "COP4710FinalDatabase.sql", THEN "COP4710ProjectSAMPLERECORDS.sql".
6. When you want to open the site, make sure Apache and MySQL are running in XAMPP, open a web browser and go to "localhost/dbproj/html/Home.html".

## Screenshots
![image](/images/HomePage.PNG)
![image](/images/CompanyContainerPage.PNG)
![image](/images/PortAdminPage.PNG)