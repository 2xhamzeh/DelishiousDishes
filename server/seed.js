// This file creates fake data for development purposes. To run, just do `node seed.js`

// Connect to database with mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dish_db");
const db = mongoose.connection;
db.on("error", () => console.log("Connection to DB failed!"));
db.once("open", () => console.log("Connected to DB"));

const passport = require("passport");

// Import models
const Dish = require("./models/dish");
const User = require("./models/user");

// The dishes we want to add
const dishes = [
  {
    name: "Fettuccine Alfredo",
    img: "/uploads/images/A_delicious_plate_of_Fettuccine_Alfredo_pasta,_cre.png",
    time: 30,
    difficulty: "Easy",
    ingredients: [
      "400g Fettuccine",
      "200ml Cream",
      "100g Parmesan",
      "50g Butter",
      "2 cloves Garlic",
    ],
    instructions: [
      "Boil pasta until al dente.",
      "Melt butter and sauté minced garlic.",
      "Add cream and grated Parmesan, stir until smooth.",
      "Combine pasta with sauce, and serve immediately.",
    ],
  },
  {
    name: "Falafel",
    img: "/uploads/images/Crispy_and_golden-brown_falafel_patties_served_wit.png",
    time: 45,
    difficulty: "Medium",
    ingredients: [
      "2 cups soaked Chickpeas",
      "4 cloves Garlic",
      "1 bunch Parsley",
      "1 small Onion",
      "1 tsp Cumin",
      "1 tsp Coriander",
      "Salt to taste",
      "Oil for frying",
    ],
    instructions: [
      "Soak chickpeas overnight.",
      "Blend chickpeas, garlic, parsley, onion, cumin, coriander, and salt until smooth.",
      "Shape mixture into small patties.",
      "Heat oil in a pan and fry patties until golden brown.",
    ],
  },
  {
    name: "Shawarma",
    img: "/uploads/images/Juicy_chicken_shawarma_wraps_with_grilled_chicken,.png",
    time: 60,
    difficulty: "Hard",
    ingredients: [
      "500g Chicken",
      "2 tbsp Shawarma spices",
      "4 Flatbreads",
      "1 cup Yogurt",
      "2 tbsp Lemon juice",
      "1 Garlic clove",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Marinate chicken with shawarma spices, yogurt, lemon juice, minced garlic, salt, and pepper for at least 2 hours.",
      "Grill the marinated chicken until fully cooked.",
      "Slice the chicken thinly.",
      "Assemble the chicken in flatbreads with desired toppings.",
    ],
  },
  {
    name: "Cheese Cake",
    img: "/uploads/images/A_rich_and_creamy_cheesecake_with_a_golden_graham_.png",
    time: 90,
    difficulty: "Medium",
    ingredients: [
      "250g Cream cheese",
      "150g Sugar",
      "200g Graham crackers",
      "100g Butter",
      "3 Eggs",
      "1 tsp Vanilla extract",
      "200ml Sour cream",
    ],
    instructions: [
      "Crush graham crackers and mix with melted butter to form the crust.",
      "Press the crust mixture into the bottom of a springform pan.",
      "Beat cream cheese and sugar until smooth.",
      "Add eggs one at a time, then add vanilla extract.",
      "Pour filling over the crust.",
      "Bake at 160°C for 50 minutes.",
      "Cool and top with sour cream, then chill before serving.",
    ],
  },
  {
    name: "Margherita Pizza",
    img: "/uploads/images/A_classic_Margherita_pizza_with_a_thin_crust,_topp.png",
    time: 40,
    difficulty: "Easy",
    ingredients: [
      "1 Pizza dough",
      "200g Tomato sauce",
      "250g Mozzarella",
      "Fresh Basil leaves",
      "Olive oil",
      "Salt and Pepper",
    ],
    instructions: [
      "Prepare the pizza dough and spread it on a baking tray.",
      "Spread tomato sauce evenly over the dough.",
      "Add sliced mozzarella on top.",
      "Season with salt, pepper, and drizzle with olive oil.",
      "Bake in a preheated oven at 220°C for 15-20 minutes.",
      "Garnish with fresh basil leaves before serving.",
    ],
  },
  {
    name: "Pad Thai",
    img: "/uploads/images/A_plate_of_Pad_Thai_with_rice_noodles,_shrimp,_tof.png",
    time: 50,
    difficulty: "Medium",
    ingredients: [
      "200g Rice noodles",
      "100g Shrimp",
      "100g Tofu",
      "50g Peanuts",
      "100g Bean sprouts",
      "2 Eggs",
      "2 tbsp Fish sauce",
      "2 tbsp Tamarind paste",
      "1 tbsp Sugar",
      "1 Lime",
      "Garlic and Chili to taste",
    ],
    instructions: [
      "Soak noodles in hot water until soft.",
      "Cook shrimp and tofu in a hot pan.",
      "Push shrimp and tofu to the side and scramble the eggs.",
      "Add noodles, fish sauce, tamarind paste, and sugar to the pan.",
      "Mix in bean sprouts and chopped peanuts.",
      "Serve with lime wedges and additional peanuts.",
    ],
  },
  {
    name: "Tacos",
    img: "/uploads/images/A_platter_of_tacos_filled_with_ground_beef,_lettuc.png",
    time: 30,
    difficulty: "Easy",
    ingredients: [
      "8 Tortillas",
      "300g Ground beef",
      "1 Lettuce",
      "100g Cheese",
      "Salsa",
      "1 Onion",
      "2 Tomatoes",
      "1 tsp Cumin",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Cook ground beef with chopped onion, cumin, salt, and pepper.",
      "Chop lettuce and tomatoes.",
      "Grate cheese.",
      "Warm tortillas in a pan.",
      "Assemble tacos with beef, lettuce, tomatoes, cheese, and salsa.",
    ],
  },
  {
    name: "Sushi",
    img: "/uploads/images/A_beautiful_plate_of_assorted_sushi_rolls_with_sus.png",
    time: 60,
    difficulty: "Hard",
    ingredients: [
      "2 cups Sushi rice",
      "4 Nori sheets",
      "200g Fish (e.g., tuna, salmon)",
      "1 Cucumber",
      "1 Avocado",
      "Soy sauce",
      "Wasabi",
      "Pickled ginger",
    ],
    instructions: [
      "Cook sushi rice and let it cool.",
      "Slice fish, cucumber, and avocado into thin strips.",
      "Place a nori sheet on a bamboo mat and spread rice evenly over it.",
      "Add fish and vegetables on top of the rice.",
      "Roll tightly using the bamboo mat.",
      "Cut the roll into bite-sized pieces.",
      "Serve with soy sauce, wasabi, and pickled ginger.",
    ],
  },
  {
    name: "Chocolate Cake",
    img: "/uploads/images/A_decadent_chocolate_cake_with_rich_frosting,_topp.png",
    time: 90,
    difficulty: "Medium",
    ingredients: [
      "200g Flour",
      "50g Cocoa powder",
      "200g Sugar",
      "3 Eggs",
      "100g Butter",
      "1 tsp Baking powder",
      "200ml Milk",
      "100g Chocolate",
      "100g Cream",
    ],
    instructions: [
      "Preheat oven to 180°C.",
      "Mix flour, cocoa powder, and baking powder in a bowl.",
      "Beat sugar and butter until fluffy, then add eggs one at a time.",
      "Add dry ingredients to the wet mixture alternately with milk.",
      "Pour batter into a greased cake pan and bake for 45 minutes.",
      "Melt chocolate and mix with cream to make frosting.",
      "Cool the cake and spread frosting evenly on top.",
    ],
  },
  {
    name: "Chicken Curry",
    img: "/uploads/images/A_flavorful_bowl_of_chicken_curry_with_pieces_of_c.png",
    time: 70,
    difficulty: "Medium",
    ingredients: [
      "500g Chicken",
      "3 tbsp Curry paste",
      "400ml Coconut milk",
      "200g Mixed vegetables (e.g., bell peppers, carrots)",
      "1 Onion",
      "2 Garlic cloves",
      "1 tbsp Ginger",
      "Cilantro for garnish",
    ],
    instructions: [
      "Sauté chopped onion, garlic, and ginger until fragrant.",
      "Add chicken pieces and cook until browned.",
      "Add curry paste and cook for a few minutes.",
      "Pour in coconut milk and bring to a simmer.",
      "Add mixed vegetables and cook until tender.",
      "Garnish with cilantro before serving.",
    ],
  },
  {
    name: "Lasagna",
    img: "/uploads/images/A_hearty_serving_of_lasagna_with_layers_of_noodles.png",
    time: 120,
    difficulty: "Hard",
    ingredients: [
      "12 Lasagna noodles",
      "500g Ground beef",
      "800g Tomato sauce",
      "500g Ricotta cheese",
      "300g Mozzarella",
      "100g Parmesan",
      "1 Onion",
      "2 Garlic cloves",
      "1 tbsp Italian seasoning",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Cook lasagna noodles according to package instructions.",
      "Sauté ground beef with chopped onion and minced garlic.",
      "Add tomato sauce and Italian seasoning, simmer for 20 minutes.",
      "Mix ricotta cheese with half of the grated Parmesan.",
      "Layer noodles, meat sauce, ricotta mixture, and mozzarella in a baking dish.",
      "Repeat layers and top with remaining Parmesan.",
      "Bake at 180°C for 45 minutes.",
    ],
  },
  {
    name: "Biryani",
    img: "/uploads/images/A_delicious_plate_of_biryani_with_basmati_rice,_pi.png",
    time: 90,
    difficulty: "Hard",
    ingredients: [
      "2 cups Basmati rice",
      "500g Chicken",
      "1 cup Yogurt",
      "2 tbsp Biryani spices",
      "2 Onions",
      "3 Tomatoes",
      "1 tsp Saffron",
      "3 tbsp Ghee",
      "Cilantro and Mint for garnish",
    ],
    instructions: [
      "Marinate chicken with yogurt and biryani spices for at least 2 hours.",
      "Cook rice with saffron and set aside.",
      "Fry sliced onions in ghee until golden brown.",
      "Add tomatoes and marinated chicken, cook until chicken is done.",
      "Layer rice and chicken mixture in a pot, and cook on low heat for 20 minutes.",
      "Garnish with cilantro and mint before serving.",
    ],
  },
  {
    name: "Caesar Salad",
    img: "/uploads/images/A_fresh_Caesar_salad_with_chopped_Romaine_lettuce,.png",
    time: 20,
    difficulty: "Easy",
    ingredients: [
      "1 Romaine lettuce",
      "100ml Caesar dressing",
      "100g Croutons",
      "50g Parmesan",
      "1 Garlic clove",
      "1 Lemon",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Chop Romaine lettuce.",
      "Toss lettuce with Caesar dressing.",
      "Add croutons and grated Parmesan.",
      "Season with salt, pepper, and a squeeze of lemon juice.",
    ],
  },
  {
    name: "Pancakes",
    img: "/uploads/images/A_stack_of_fluffy_pancakes_topped_with_butter_and_.png",
    time: 20,
    difficulty: "Easy",
    ingredients: [
      "200g Flour",
      "300ml Milk",
      "2 Eggs",
      "2 tbsp Sugar",
      "1 tbsp Baking powder",
      "50g Butter",
      "Maple syrup for serving",
    ],
    instructions: [
      "Mix flour, sugar, and baking powder in a bowl.",
      "Whisk in milk and eggs until smooth.",
      "Heat a non-stick pan and melt a bit of butter.",
      "Pour batter into the pan to form pancakes.",
      "Cook until bubbles form, then flip and cook until golden.",
      "Serve with butter and maple syrup.",
    ],
  },
  {
    name: "Grilled Cheese",
    img: "/uploads/images/A_classic_grilled_cheese_sandwich_with_golden,_cri.png",
    time: 10,
    difficulty: "Easy",
    ingredients: [
      "4 slices Bread",
      "50g Butter",
      "100g Cheese",
      "Salt to taste",
    ],
    instructions: [
      "Butter one side of each bread slice.",
      "Place cheese between two slices, buttered sides out.",
      "Heat a pan and grill sandwich until golden and cheese is melted.",
      "Serve hot with a pinch of salt.",
    ],
  },
  {
    name: "Beef Stroganoff",
    img: "/uploads/images/A_hearty_bowl_of_beef_stroganoff_with_tender_piece.png",
    time: 60,
    difficulty: "Medium",
    ingredients: [
      "500g Beef",
      "200g Mushrooms",
      "1 Onion",
      "200ml Sour cream",
      "2 tbsp Flour",
      "1 tbsp Mustard",
      "2 tbsp Butter",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Slice beef and sauté in butter until browned.",
      "Remove beef and cook sliced mushrooms and chopped onion in the same pan.",
      "Sprinkle flour over mushrooms and onions, cook for 1 minute.",
      "Stir in sour cream and mustard, then return beef to the pan.",
      "Simmer until sauce thickens.",
      "Serve over egg noodles or rice.",
    ],
  },
  {
    name: "Clam Chowder",
    img: "/uploads/images/A_creamy_bowl_of_clam_chowder_with_clams,_potatoes.png",
    time: 45,
    difficulty: "Medium",
    ingredients: [
      "500g Clams",
      "2 Potatoes",
      "1 Onion",
      "200ml Cream",
      "2 tbsp Butter",
      "1 tbsp Flour",
      "1 Bay leaf",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Cook clams in water until they open, remove from shells and chop.",
      "Dice potatoes and chop onion.",
      "Melt butter in a pot, add flour and cook for 1 minute.",
      "Add diced potatoes, chopped onion, and bay leaf.",
      "Pour in clam cooking liquid and simmer until potatoes are tender.",
      "Stir in cream and clams, heat through.",
      "Season with salt and pepper.",
    ],
  },
  {
    name: "Eggs Benedict",
    img: "/uploads/images/A_plate_of_eggs_benedict_with_poached_eggs_on_toas.png",
    time: 30,
    difficulty: "Hard",
    ingredients: [
      "2 English muffins",
      "4 Eggs",
      "4 slices Ham",
      "200ml Hollandaise sauce",
      "1 tbsp Vinegar",
      "Salt and Pepper to taste",
      "Chives for garnish",
    ],
    instructions: [
      "Toast English muffins.",
      "Poach eggs in simmering water with vinegar until whites are set.",
      "Heat slices of ham in a pan.",
      "Place ham on toasted muffins, top with poached eggs and Hollandaise sauce.",
      "Garnish with chopped chives.",
    ],
  },
  {
    name: "Ratatouille",
    img: "/uploads/images/A_beautifully_arranged_plate_of_ratatouille_with_s.png",
    time: 60,
    difficulty: "Medium",
    ingredients: [
      "1 Eggplant",
      "2 Zucchinis",
      "4 Tomatoes",
      "2 Bell peppers",
      "1 Onion",
      "4 Garlic cloves",
      "Olive oil",
      "Salt and Pepper to taste",
      "Thyme and Basil for garnish",
    ],
    instructions: [
      "Slice eggplant, zucchinis, tomatoes, and bell peppers.",
      "Chop onion and garlic.",
      "Layer vegetables in a baking dish, alternating slices.",
      "Drizzle with olive oil and season with salt, pepper, thyme, and basil.",
      "Bake at 180°C for 45 minutes or until vegetables are tender.",
      "Garnish with fresh herbs.",
    ],
  },
  {
    name: "Chicken Alfredo",
    img: "/uploads/images/A_creamy_plate_of_chicken_Alfredo_with_slices_of_g.png",
    time: 40,
    difficulty: "Easy",
    ingredients: [
      "500g Chicken breast",
      "400g Fettuccine",
      "200ml Cream",
      "100g Parmesan",
      "50g Butter",
      "2 Garlic cloves",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Cook chicken breasts until browned and cooked through, then slice.",
      "Boil pasta until al dente.",
      "Melt butter and sauté minced garlic.",
      "Add cream and grated Parmesan, stir until smooth.",
      "Combine pasta with sauce and chicken slices, and serve immediately.",
    ],
  },
  {
    name: "Fish Tacos",
    img: "/uploads/images/A_plate_of_fish_tacos_with_crispy_fish_fillets,_sh.png",
    time: 30,
    difficulty: "Easy",
    ingredients: [
      "4 Fish fillets",
      "8 Tortillas",
      "200g Cabbage",
      "100g Salsa",
      "1 Lime",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Season fish fillets with salt and pepper.",
      "Cook fish in a pan until fully cooked, then break into pieces.",
      "Shred cabbage.",
      "Warm tortillas in a pan.",
      "Assemble tacos with fish, shredded cabbage, and salsa.",
      "Serve with lime wedges.",
    ],
  },
  {
    name: "BBQ Ribs",
    img: "/uploads/images/A_platter_of_BBQ_ribs_with_a_thick_layer_of_BBQ_sa.png",
    time: 180,
    difficulty: "Hard",
    ingredients: [
      "1kg Pork ribs",
      "200ml BBQ sauce",
      "2 tbsp Spices (e.g., paprika, garlic powder)",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Season ribs with spices, salt, and pepper.",
      "Slow cook ribs in the oven at 150°C for 2 hours.",
      "Brush with BBQ sauce and grill for 30 minutes until caramelized.",
    ],
  },
  {
    name: "Greek Salad",
    img: "/uploads/images/A_fresh_Greek_salad_with_chopped_cucumber,_tomatoe.png",
    time: 15,
    difficulty: "Easy",
    ingredients: [
      "1 Cucumber",
      "4 Tomatoes",
      "100g Feta cheese",
      "50g Olives",
      "1 Red onion",
      "Olive oil",
      "Oregano",
      "Salt and Pepper to taste",
    ],
    instructions: [
      "Chop cucumber, tomatoes, and red onion.",
      "Crumble feta cheese.",
      "Combine all ingredients in a bowl.",
      "Drizzle with olive oil, and season with oregano, salt, and pepper.",
    ],
  },
  {
    name: "Stuffed Peppers",
    img: "/uploads/images/A_colorful_plate_of_stuffed_bell_peppers_filled_wi.png",
    time: 60,
    difficulty: "Medium",
    ingredients: [
      "4 Bell peppers",
      "300g Ground beef",
      "1 cup Rice",
      "400g Tomato sauce",
      "1 Onion",
      "2 Garlic cloves",
      "Salt and Pepper to taste",
      "Cheese for topping",
    ],
    instructions: [
      "Cook rice according to package instructions.",
      "Sauté ground beef with chopped onion and minced garlic.",
      "Mix cooked rice, beef, and half of the tomato sauce.",
      "Cut the tops off bell peppers and remove seeds.",
      "Stuff peppers with the beef mixture.",
      "Place in a baking dish, pour remaining tomato sauce over peppers.",
      "Bake at 180°C for 40 minutes.",
      "Top with cheese and bake until melted.",
    ],
  },
  {
    name: "Lemon Meringue Pie",
    img: "/uploads/images/A_slice_of_lemon_meringue_pie_with_a_golden_crust,.png",
    time: 90,
    difficulty: "Hard",
    ingredients: [
      "1 Pie crust",
      "3 Lemons",
      "200g Sugar",
      "3 Eggs",
      "1 tbsp Cornstarch",
      "200ml Water",
      "100g Sugar for meringue",
    ],
    instructions: [
      "Bake pie crust according to package instructions.",
      "Grate lemon zest and juice the lemons.",
      "Mix lemon juice, zest, 200g sugar, cornstarch, and water in a pot.",
      "Cook over medium heat until thickened.",
      "Beat egg yolks and add to lemon mixture, cook for another 2 minutes.",
      "Pour filling into baked pie crust.",
      "Beat egg whites and gradually add 100g sugar to make meringue.",
      "Top pie with meringue and bake at 180°C until golden.",
    ],
  },
  {
    name: "Chicken Tikka Masala",
    img: "/uploads/images/A_bowl_of_chicken_tikka_masala_with_pieces_of_mari.png",
    time: 60,
    difficulty: "Medium",
    ingredients: [
      "500g Chicken",
      "1 cup Yogurt",
      "2 tbsp Tikka masala spices",
      "400g Tomato sauce",
      "200ml Cream",
      "1 Onion",
      "2 Garlic cloves",
      "Ginger",
      "Cilantro for garnish",
    ],
    instructions: [
      "Marinate chicken with yogurt and tikka masala spices for at least 2 hours.",
      "Cook chicken in a hot pan until done.",
      "Sauté chopped onion, minced garlic, and ginger.",
      "Add tomato sauce and bring to a simmer.",
      "Add cooked chicken and cream, simmer for 10 minutes.",
      "Garnish with cilantro before serving.",
    ],
  },
  {
    name: "Goulash",
    img: "/uploads/images/A_hearty_bowl_of_goulash_with_tender_pieces_of_bee.png",
    time: 75,
    difficulty: "Medium",
    ingredients: [
      "500g Beef",
      "2 Onions",
      "2 tbsp Paprika",
      "3 Potatoes",
      "2 Bell peppers",
      "3 Tomatoes",
      "Salt and Pepper to taste",
      "1 tbsp Flour",
      "1 tbsp Caraway seeds",
      "2 tbsp Tomato paste",
    ],
    instructions: [
      "Cut beef into cubes and brown in a pot.",
      "Add chopped onions and cook until soft.",
      "Sprinkle with flour and paprika, stir well.",
      "Add chopped bell peppers, tomatoes, and tomato paste.",
      "Pour in enough water to cover ingredients, add caraway seeds, salt, and pepper.",
      "Simmer for 1 hour or until meat is tender.",
      "Add diced potatoes and cook until soft.",
    ],
  },
  {
    name: "Quiche Lorraine",
    img: "/uploads/images/A_savory_quiche_Lorraine_with_a_golden_crust,_fill.png",
    time: 60,
    difficulty: "Medium",
    ingredients: [
      "1 Pie crust",
      "4 Eggs",
      "200ml Cream",
      "200g Bacon",
      "100g Gruyere cheese",
      "Salt and Pepper to taste",
      "Nutmeg",
    ],
    instructions: [
      "Bake pie crust according to package instructions.",
      "Cook bacon until crisp, then chop.",
      "Beat eggs and mix with cream, grated Gruyere cheese, salt, pepper, and a pinch of nutmeg.",
      "Spread bacon over the pie crust.",
      "Pour egg mixture over bacon.",
      "Bake at 180°C for 30-35 minutes or until set.",
    ],
  },
  {
    name: "Bruschetta",
    img: "/uploads/images/A_plate_of_bruschetta_with_toasted_baguette_slices.png",
    time: 20,
    difficulty: "Easy",
    ingredients: [
      "1 Baguette",
      "4 Tomatoes",
      "2 Garlic cloves",
      "Fresh Basil",
      "Olive oil",
      "Salt and Pepper to taste",
      "Balsamic vinegar",
    ],
    instructions: [
      "Slice baguette and toast in the oven until golden.",
      "Dice tomatoes and mix with minced garlic, chopped basil, olive oil, salt, and pepper.",
      "Top toasted baguette slices with tomato mixture.",
      "Drizzle with balsamic vinegar before serving.",
    ],
  },
  {
    name: "Shrimp Scampi",
    img: "/uploads/images/A_plate_of_shrimp_scampi_with_plump_shrimp,_garlic.png",
    time: 30,
    difficulty: "Easy",
    ingredients: [
      "400g Shrimp",
      "4 Garlic cloves",
      "100g Butter",
      "1 Lemon",
      "Fresh Parsley",
      "Salt and Pepper to taste",
      "200g Spaghetti",
    ],
    instructions: [
      "Cook spaghetti according to package instructions.",
      "Sauté minced garlic in butter until fragrant.",
      "Add shrimp and cook until pink.",
      "Squeeze lemon juice over shrimp and season with salt and pepper.",
      "Toss shrimp with cooked spaghetti and chopped parsley.",
    ],
  },
];

// The users to add
const users = [
  {
    username: "adminMaster",
    password: "admin123",
    description:
      "Administrator of the platform, responsible for overseeing all user activities and maintaining the system.",
    img: "/uploads/images/cook1.png",
  },
  {
    username: "johnDoe123",
    password: "123123123",
    description:
      "Just a regular user who loves exploring new recipes and sharing feedback with the community.",
    img: "/uploads/images/cook2.png",
  },
  {
    username: "foodieLover",
    password: "password1",
    description:
      "A passionate food lover who enjoys trying out different cuisines and experimenting with new recipes.",
    img: "/uploads/images/cook3.png",
  },
  {
    username: "chefMike",
    password: "password2",
    description:
      "Professional chef with years of experience in the culinary industry, sharing gourmet recipes and tips.",
    img: "/uploads/images/cook4.png",
  },
  {
    username: "bakerBella",
    password: "password3",
    description:
      "A skilled baker who specializes in making delightful pastries, cakes, and other baked goods.",
    img: "/uploads/images/cook1.png",
  },
  {
    username: "grillMasterTom",
    password: "password4",
    description:
      "Grill master known for his expertise in barbecuing and grilling meats to perfection.",
    img: "/uploads/images/cook2.png",
  },
  {
    username: "greenVeggieGal",
    password: "password5",
    description:
      "Vegetarian who loves creating delicious and healthy plant-based meals.",
    img: "/uploads/images/cook3.png",
  },
  {
    username: "veganVibes",
    password: "password6",
    description:
      "Dedicated vegan sharing a variety of plant-based recipes and tips for a sustainable lifestyle.",
    img: "/uploads/images/cook4.png",
  },
  {
    username: "homeCookHarry",
    password: "password7",
    description:
      "Home cook who enjoys preparing meals for family and friends, focusing on comfort food and easy recipes.",
    img: "/uploads/images/cook1.png",
  },
  {
    username: "foodBloggerJane",
    password: "password8",
    description:
      "Food blogger who documents culinary adventures and shares detailed recipes with a wide audience.",
    img: "/uploads/images/cook2.png",
  },
  {
    username: "gourmetChefGrace",
    password: "password9",
    description:
      "Gourmet chef with a flair for fine dining, specializing in creating exquisite dishes with intricate flavors.",
    img: "/uploads/images/cook3.png",
  },
  {
    username: "dessertLoverLily",
    password: "password10",
    description:
      "Avid dessert lover who enjoys baking and sharing sweet treats, from cakes to cookies and more.",
    img: "/uploads/images/cook4.png",
  },
  {
    username: "sauceExpertSam",
    password: "password11",
    description:
      "Expert in making a wide range of sauces, enhancing the flavors of dishes with unique and tasty concoctions.",
    img: "/uploads/images/cook1.png",
  },
  {
    username: "soupSpecialistSue",
    password: "password12",
    description:
      "Soup specialist known for crafting hearty and flavorful soups, perfect for any season.",
    img: "/uploads/images/cook2.png",
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Delete all current dish data
    await Dish.deleteMany();
    console.log("Dish data deleted!");

    // Delete all current user data
    await User.deleteMany();
    console.log("User data deleted!");

    // Creating new users
    const createdUsers = [];
    for (const user of users) {
      const newUser = new User({
        username: user.username,
        description: user.description,
        img: user.img,
      });
      const registeredUser = await User.register(newUser, user.password);
      createdUsers.push(registeredUser);
    }
    console.log("Users created!");

    // Creating new dishes and associating them with users
    for (let i = 0; i < dishes.length; i++) {
      // Assign each dish to a user
      const user = createdUsers[i % createdUsers.length];
      const dish = new Dish({
        name: dishes[i].name,
        img: dishes[i].img,
        time: dishes[i].time,
        difficulty: dishes[i].difficulty,
        ingredients: dishes[i].ingredients,
        instructions: dishes[i].instructions,
        author: user._id,
      });
      await dish.save();
      user.dishes.push(dish._id);
      await user.save();
    }
    console.log("Dishes created and associated with users!");

    // Close the connection
    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
