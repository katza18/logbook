require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/connectDB.js');
const logsCtrl = require('./controllers/logsController');
const usersCtrl = require('./controllers/usersController');
const workoutsCtrl = require('./controllers/workoutsController');
const exercisesCtrl = require('./controllers/exercisesController');
const mealsCtrl = require('./controllers/mealsController');
const foodsCtrl = require('./controllers/foodsController');
const requireAuth = require('./middleware/requireAuth.js');

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());

//User routes
app.post("/signup", usersCtrl.signup);
app.post("/login", usersCtrl.login);
app.get("/logout", usersCtrl.logout);
app.get("/auth", requireAuth.requireAuth, usersCtrl.authorize);
app.put("/account", requireAuth.requireAuth, usersCtrl.updateAccount);

//Log routes
app.get("/logs", requireAuth.requireAuth, logsCtrl.fetchLogs);
app.get("/logs/:id", requireAuth.requireAuth, logsCtrl.fetchLog);
app.post("/logs", requireAuth.requireAuth, logsCtrl.createLog);
app.put("/logs/:id", requireAuth.requireAuth, logsCtrl.updateLog);
app.delete("/logs/:id", requireAuth.requireAuth, logsCtrl.deleteLog);

//Workout routes
app.get("/logs/:id/workouts", requireAuth.requireAuth, workoutsCtrl.fetchWorkouts);
app.get("/workouts/:id", requireAuth.requireAuth, workoutsCtrl.fetchWorkout);
app.post("/workouts", requireAuth.requireAuth, workoutsCtrl.createWorkout);
app.put("/workouts/:id", requireAuth.requireAuth, workoutsCtrl.updateWorkout);
app.delete("/workouts/:id", requireAuth.requireAuth, workoutsCtrl.deleteWorkout);

//Exercise routes
app.get("/workouts/:id/exercises", requireAuth.requireAuth, exercisesCtrl.fetchExercises);
app.post("/exercises", requireAuth.requireAuth, exercisesCtrl.createExercise);
app.put("/exercises/:id", requireAuth.requireAuth, exercisesCtrl.updateExercise);
app.delete("/exercises/:id", requireAuth.requireAuth, exercisesCtrl.deleteExercise);

//Meal routes
app.get("/logs/:id/meals", requireAuth.requireAuth, mealsCtrl.fetchMeals);
app.get("/meals/:id", requireAuth.requireAuth, mealsCtrl.fetchMeal);
app.post("/meals", requireAuth.requireAuth, mealsCtrl.createMeal);
app.put("/meals/:id", requireAuth.requireAuth, mealsCtrl.updateMeal);
app.delete("/meals/:id", requireAuth.requireAuth, mealsCtrl.deleteMeal);

//Food routes
app.get("/meals/:id/foods", requireAuth.requireAuth, foodsCtrl.fetchFoods);
app.post("/foods", requireAuth.requireAuth, foodsCtrl.createFood);
app.put("/foods/:id", requireAuth.requireAuth, foodsCtrl.updateFood);
app.delete("/foods/:id", requireAuth.requireAuth, foodsCtrl.deleteFood);

app.listen(process.env.PORT);
