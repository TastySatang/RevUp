# Rev up

This is the starter for the Flask React project to demo technologies learned so far.

Python used for backend with React Redux frontend.

[<Link to Live Website!>](https://rev-up.herokuapp.com/)

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

Website on succesful load should look something like these:

`Landing`
[!Landing](https://github.com/TastySatang/aprilMod6GroupProject/blob/main/react-app/public/exampleweb.png)

