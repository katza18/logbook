# Exercise and Nutrition Logbook

The purpose of this project is to provide a logbook for exercise and nutrition that eventually automates the processes of exercise program adjustments (progressive overload calculations, increases or decreases in volume, etc.) and the weight management and body compositional aspects of dieting (through caloric and macronutrient adjustments and tracking).

# What I Learned

Throughout this project I have had to learn more and more about web application development using React. I initially started out with the goal of creating a basic CRUD application using the MERN stack.

Backend:
1. Mongoose: I used the mongoose library's schemas to model data for foods, exercises, meals, workouts, logs, and users, as well as to connect to and query a MongoDB database.

2. Middleware/jsonwebtoken: I used middleware for the first time to authorize users for the website using jsonwebtokens and cookies. The server checks a request's authorization cookie to ensure that the decoded token matches the one assigned to the user.

3. bcrypt: I used bcrypt to hash user passwords for the first time for password security such that a hash is stored in the database rather than the user password.

Frontend:
4. React: Being my first project using React, I learned how to use javascript to render the HTML of the app and to allow for rerenders on data change. I also had to learn about the formatting of an app using pages and components.

5. zustand: In order to store state, I used zustand. I had a hard time initially on the meals page of the app, with getting the daily caloric and macronutrient intakes to rerender when food tables were updated. To fix this, I had to import the meals' state as it's own constant to ensure that the component would rerender everytime a meals data changed.

6. Bootstrap: As styling the website was not my main focus, I learned to use react-bootstrap components to simplify styling and arrangement.

7. Axios: I used axios to make simple get, post, put, and delete requests to the server.

8. React-router-dom: I used the react-router-dom library to simplify the webpages routes. This simply allowed inputing a path and rendering the desired page in one component.

# Future Plans

My next steps for the project include:
1. Setting up statistical data for dietary intakes such as graphing actual caloric intake to recommended intake based on a users goals.

2. Setting up a program builder for users to input goals and recieve a list of exercises to choose from. The software will then build them a program based on their goals with recommended sets, reps, and intensity for each exercise.
