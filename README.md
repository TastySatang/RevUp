# Rev up

Rev up is a fullstack application that lets users create and view their car events with others.

### Technologies used

* PostgreSQL
* Python
* Flask
* JavaScript
* React
* Redux
* HTML5
* CSS3

Please chck the [Wiki](https://github.com/TastySatang/RevUp/wiki) for lists of MVPs, User Stories, Database Schema, API Dcoumentation, Frontend Routes.

[<Link to Live Website!>](https://rev-up.herokuapp.com/)


Website on succesful load should look something like these:

`Landing Page`

![Landing](https://github.com/TastySatang/aprilMod6GroupProject/blob/main/react-app/public/exampleweb.png)

`Events Page`

![Events](https://github.com/TastySatang/aprilMod6GroupProject/blob/main/react-app/public/events.png)

`Event Page`

![Event](https://github.com/TastySatang/aprilMod6GroupProject/blob/main/react-app/public/event.png)

`Home Page`

![Home](https://github.com/TastySatang/aprilMod6GroupProject/blob/main/react-app/public/home.png)

## Using this repository

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/TastySatang/aprilMod6GroupProject.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***
