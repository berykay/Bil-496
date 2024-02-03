-- Users Table Sample Data
INSERT INTO Users (Username, Gender, Age, Height, Weight, Goal, DietPreference) VALUES
('JohnDoe', 'Male', 28, 180, 80, 'Gain Muscle', 'Omnivore'),
('JaneSmith', 'Female', 32, 165, 60, 'Lose Weight', 'Vegetarian'),
('AlexJohnson', 'Other', 40, 170, 70, 'Maintain Weight', 'Vegan');

-- Regions Table Sample Data
INSERT INTO Regions (Country, City) VALUES
('United States', 'New York'),
('Turkey', 'Ankara'),
('Germany', 'Berlin');

-- HealthConditions Table Sample Data
INSERT INTO HealthConditions (ConditionName) VALUES
('Diabetes'),
('Lactose Intolerance'),
('Gluten Sensitivity');

-- FoodComponents Table Sample Data
INSERT INTO FoodComponents (Name, Measure, Calories, Carbs, Fats, Proteins, Category, RegionID) VALUES
('Chicken', '100g', 239, 0, 13.57, 27.3, 'Protein', 1),
('Olive Oil', '1 tbsp', 119, 0, 13.5, 0, 'Fat', 2),
('Tomato', '100g', 18, 3.9, 0.2, 0.9, 'Vegetable', 3);

-- Meals Table Sample Data
-- Assuming meals are created without total macros, which will be calculated later as needed.
INSERT INTO Meals (MealName, Category, RegionID) VALUES
('Grilled Chicken Salad', 'Salad', 1),
('Pasta with Tomato Sauce', 'Main Course', 2),
('Vegetable Stir Fry', 'Main Course', 3);

-- MealComponents Table Sample Data
-- Assuming the MealIDs and ComponentIDs correspond to the previously inserted data.
INSERT INTO MealComponents (MealID, ComponentID, Amount) VALUES
(1, 1, 150), -- 150g of Chicken in Grilled Chicken Salad
(2, 3, 200), -- 200g of Tomato in Pasta with Tomato Sauce
(3, 3, 100); -- 100g of Tomato in Vegetable Stir Fry

-- Allergens Table Sample Data
INSERT INTO Allergens (AllergenName) VALUES
('Peanuts'),
('Dairy'),
('Seafood');

-- ComponentAllergens Table Sample Data
INSERT INTO ComponentAllergens (ComponentID, AllergenID) VALUES
(1, 3), -- Chicken associated with Seafood allergy (hypothetical example)
(3, 2); -- Tomato associated with Dairy allergy (hypothetical example)

-- FoodPreferences Table Sample Data
INSERT INTO FoodPreferences (UserID, ComponentID, PreferenceType) VALUES
(1, 3, 'Like'), -- John Doe likes Tomato
(2, 1, 'Dislike'); -- Jane Smith dislikes Chicken

-- UserMeals Table Sample Data
INSERT INTO UserMeals (UserID, MealID, Frequency) VALUES
(1, 1, 5), -- John Doe has had the Grilled Chicken Salad 5 times
(2, 2, 3); -- Jane Smith has had the Pasta with Tomato Sauce 3 times

-- UserAllergies Table Sample Data
INSERT INTO UserAllergies (UserID, AllergenID) VALUES
(1, 1), -- John Doe is allergic to Peanuts
(2, 2); -- Jane Smith is lactose intolerant
