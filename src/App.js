import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import Landing from "./components/layouts/Landing";
import Recipes from "./components/recipe/Recipes";
import RecipeDetail from "./components/recipe/RecipeDetail";
import RecipeCreate from "./components/recipe/RecipeCreate";
import RecipeEdit from "./components/recipe/RecipeEdit";
import WithPrivateRoute from "./utils/WithPrivateRoute";
import Dashboard from "./components/layouts/Dashboard";

import Profile from "./components/accounts/Profile";
import MyRecipes from "./components/recipe/MyRecipes";
import SavedRecipes from "./components/recipe/SavedRecipes";

import ErrorDiv from "./components/layouts/ErrorDiv";
import SearchRecipes from "./components/recipe/SearchRecipes";
import CategoryForm from "./components/recipe/category_form/CategoryForm";
import Categories from "./components/recipe/Categories";
import CategoryCreate from "./components/recipe/CategoryCreate";
import RecipeMaker from "./components/recipe/RecipeMaker";
import LoaderMask from "./components/layouts/LoaderMask";
import { ToastContainer } from "react-toastify";
import MealForm from "./components/mealplan/MealForm";
import MealCreate from "./components/mealplan/CreateMeal";
import MealPlanCreate from "./components/mealplan/CreateMealPlan";
import MealPlans from "./components/mealplan/MealPlans";
import MealPlanDetail from "./components/mealplan/MealPlanDetail";
import MealPlanEdit from "./components/mealplan/MealPlanEdit";
import MyMeals from "./components/mealplan/MyMeals";
import MealEdit from "./components/mealplan/MealEdit";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/loader" element={<LoaderMask />} />
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/search" element={<SearchRecipes />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/recipe" element={<Recipes />} />      
          <Route exact path="/mealPlans" element={<MealPlans all />} />  
          <Route exact path="/mealPlan/:id" element={<MealPlanDetail />} /> 
          <Route
            exact
            path="/mealPlan/edit/:id"
            element={
              <WithPrivateRoute>
                <MealPlanEdit />
              </WithPrivateRoute>
            }
          />
          <Route exact path="/recipe/:id" element={<RecipeDetail />} />
          <Route
            exact
            path="/recipe/create"
            element={
              <WithPrivateRoute>
                <RecipeCreate />
              </WithPrivateRoute>
            }
          />
          <Route
            exact
            path="/recipe/:id/edit"
            element={
              <WithPrivateRoute>
                <RecipeEdit />
              </WithPrivateRoute>
            }
          />
          <Route
            exact
            path="/meals/edit/:id"
            element={
              <WithPrivateRoute>
                <MealEdit />
              </WithPrivateRoute>
            }
          />
          <Route
            exact
            path="/recipe/categories/create"
            element={
              <WithPrivateRoute>
                <CategoryCreate />
              </WithPrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <WithPrivateRoute>
                <Dashboard />
              </WithPrivateRoute>
            }
          >
            <Route exact path="myCategories" element={<Categories />} />
            <Route exact path="categories" element={<Categories all />} />
            <Route path="profile" element={<Profile />} />
            <Route path="myRecipes" element={<MyRecipes />} /> 
            <Route exact path="myMeals" element={<MyMeals />} />
            <Route exact path="myMealPlans" element={<MealPlans />} />
            <Route path="savedRecipes" element={<SavedRecipes />} />
            <Route exact path="recipeMaker" element={<RecipeMaker />} />
            <Route exact path="meal-create" element={<MealCreate />} />
            <Route exact path="mealPlan-create" element={<MealPlanCreate />} />            
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}
