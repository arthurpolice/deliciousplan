# deliciousplan
Meal Planner Website


## Complexity and Distinctiveness

This is a project that uses Django as a REST API and React as the frontend, which is a different approach to the one used throughout the course. A meal planner app also is very distinct from anything made so far.
The complexity of setting up those two sides of the application provided a significantly greater challenge when compared to the usual rendering method used in pure Django applications that use javascript mostly for DOM manipulation. It is difficult to quantify the complexity of the relationship between the models, but the intertwining of the models in this project greatly exceeds that of any other project covered in the course. 

## The Files


This project is structured in the following manner:

In the backend folder, you'll find the python files that run the REST API.
In the frontend folder, you'll find the javascript files that use React and NextJS to render pages.

### Backend
#### views.py

This is the file that receives the requests from the frontend and returns responses to it. It requires token authentication for most routes, which is handled by Django Rest Framework and Knox.
A general gist of the paths in the backend would be:

##### get_all_recipes
This function returns a dictionary with every single recipe available in the database, each one being its own dictionary with all the relevant information to be displayed by the frontend.

##### get_recipe

Similar to the above, this one returns a single recipe's data. This is used to display a recipe in more detail on a page dedicated to it.

##### extract_recipe_from_url

This function takes an URL as input from the user, sends it to an external API (Spoonacular) and, upon validation of the data, logs it to the database.

##### log_recipe
This function is the crux of the project. It dismantles the dictionary it receives and breaks it into multiple different model objects that are correlated by many to many relationships. The result is a fairly modular approach to the data storage, with the purpose of saving processing power and API calls.

##### remove_recipe
Self explanatory.

##### get_daily_plan
This function extracts a given day from a user's "Calendar" object. It is then used by the frontend to display what recipes the user has planned for that day and other information.

##### add_to_daily_plan
This function receives a recipe id, a date and the amount of servings and adds it to a "Day" object.

##### Others
The rest of the functions are mostly self-explanatory, without much to add to what's already in the comments in the code.
#### util.py

This file contains helper functions for organizing data and contacting the external API used to extract recipes from third party websites.

#### Others

Other files are the standard for Django apps, not deviating from the usual structure.

### Frontend

#### Folder: components

This folder, as the name suggests, contains the react components used in the app's pages, following the modular approach proposed by the React paradigm.

#### Folder: lib

This folder contains files that deal with the frontend-backend communication. All files in here deal with fetch requests.

#### Folder: pages

This folder contains the pages for the app. Let's see what each page is:

##### Page: catalog.js

This is a server side rendered (SSR) page that contains all the recipes present in the database. It uses NextJS's approach to SSR, running a fetch request to retrieve said recipes before displaying the page to the user. This page also contains: like buttons for each recipe, a search bar for filtering recipes.


#### Page: extract.js

This is a page with the single purpose of sending fetch requests with third party recipes to the backend portion of the app. It then analyzes the response received from the backend and reacts accordingly.

#### Page: calendar.js

This page uses a calendar module for React and builds on top of it. It displays the meals a user has planned for a given day, also giving options to visit the recipe's web pages and deleting recipes from meals, etc.

#### Page: calculator.js

This page is used to send information to the backend to calculate a user's target calories, which will be displayed in the calendar for comparison with the calories planned for the day.

#### Page: makerecipe.js

This page contains fields to select from the pool of ingredients already contained in the database. This is to limit the freedom of the users and direct their behavior. It's also an interesting approach, once, as the amount of recipes grows, so does the pool of ingredients, so it's an ever expanding catalog of ingredients.
The page then sends an object structured exactly like the ones receives from Spoonacular, and then the backend logs the recipe in the exact same process.

#### Page: [id].js

This is a dynamically generated set of pages that represent every recipe contained in the database. It's the door through which users will plan their meals, with the ADD MEAL button.
It displays in-depth information about each recipe, with a breakdown of ingredients and measurements in multiple systems.


## How to run

The first step is to install all the dependencies, both on the backend and frontend.
For the backend, you'll find the relevant libraries in requirements.txt.
As for the frontend, npm install should be enough to have everything set.

The fetch requests from the frontend are directed to a page I've hosted, so there is no need to really run your own django app. If you run "npm run dev" on the terminal from the frontend folder, you should be good to go! (I've allowed requests from 'http://localhost:3000', for ease of use).

Alternatively, you can simply visit the NextJS page hosted at: https://delicious-plan.vercel.app/catalog !
