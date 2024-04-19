Run `npm i react-router-dom` in `project/frontend` file

then run `npm start` in `/project/frontend` to start the frontend 

Run `npm start` in `/project/server` to start the backend

To run the test cases:

cd `project/server`

Run `npm test` 

The test cases are designed to pass once, this is because if you were to run them again there will be errors as the dummy users will not be deleted and thus cause errors when the tests are run because they are attempted to be created again, but exist in the database. We manually deleted them when testing to ensure we can see they updated in the database
