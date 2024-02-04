-- Users Tablosu
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    Age INT NOT NULL,
    Height INT NOT NULL,
    Weight INT NOT NULL,
    Goal ENUM('Lose Weight', 'Gain Muscle', 'Maintain Weight') NOT NULL,
    DietPreference ENUM('Omnivore', 'Vegetarian', 'Vegan') NOT NULL,
    ActivityLevel ENUM('Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active') NOT NULL DEFAULT 'Sedentary',
);

-- Regions Tablosu
CREATE TABLE Regions (
    RegionID INT AUTO_INCREMENT PRIMARY KEY,
    Country VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL
);

-- HealthConditions Tablosu
CREATE TABLE HealthConditions (
    ConditionID INT AUTO_INCREMENT PRIMARY KEY,
    ConditionName VARCHAR(255) NOT NULL
);

-- FoodComponents Tablosu
CREATE TABLE FoodComponents (
    ComponentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Measure VARCHAR(50) NOT NULL,
    Calories INT NOT NULL,
    Carbs DECIMAL(10,2) NOT NULL,
    Fats DECIMAL(10,2) NOT NULL,
    Proteins DECIMAL(10,2) NOT NULL,
    Category VARCHAR(255) NOT NULL,
    RegionID INT,
    FOREIGN KEY (RegionID) REFERENCES Regions(RegionID)
);

-- Meals Tablosu
CREATE TABLE Meals (
    MealID INT AUTO_INCREMENT PRIMARY KEY,
    MealName VARCHAR(255) NOT NULL,
    Category VARCHAR(255) NOT NULL,
    RegionID INT,
    FOREIGN KEY (RegionID) REFERENCES Regions(RegionID)
);

CREATE TABLE MealComponents (
    MealComponentID INT AUTO_INCREMENT PRIMARY KEY,
    MealID INT NOT NULL,
    ComponentID INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL, -- Bu, yemeğin içindeki her bir bileşenin miktarını gram cinsinden belirtir.
    FOREIGN KEY (MealID) REFERENCES Meals(MealID),
    FOREIGN KEY (ComponentID) REFERENCES FoodComponents(ComponentID)
);

-- Allergens Tablosu
CREATE TABLE Allergens (
    AllergenID INT AUTO_INCREMENT PRIMARY KEY,
    AllergenName VARCHAR(255) NOT NULL
);

-- ComponentAllergens Tablosu
CREATE TABLE ComponentAllergens (
    ComponentID INT NOT NULL,
    AllergenID INT NOT NULL,
    FOREIGN KEY (ComponentID) REFERENCES FoodComponents(ComponentID),
    FOREIGN KEY (AllergenID) REFERENCES Allergens(AllergenID),
    PRIMARY KEY (ComponentID, AllergenID)
);

-- FoodPreferences Tablosu
CREATE TABLE FoodPreferences (
    PreferenceID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ComponentID INT NOT NULL,
    PreferenceType ENUM('Like', 'Dislike') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ComponentID) REFERENCES FoodComponents(ComponentID)
);

-- UserMeals Tablosu
CREATE TABLE UserMeals (
    UserMealID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    MealID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (MealID) REFERENCES Meals(MealID),
    ADD COLUMN Frequency INT DEFAULT 1;
);

-- UserAllergies Tablosu (Opsiyonel, kullanıcıların alerjilerini ayrı bir tabloda saklamak için)
CREATE TABLE UserAllergies (
    UserID INT NOT NULL,
    AllergenID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AllergenID) REFERENCES Allergens(AllergenID),
    PRIMARY KEY (UserID, AllergenID)
);

CREATE TABLE DietPlans (
    DietPlanID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    PlanDate DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE DietPlanDetails (
    DetailID INT AUTO_INCREMENT PRIMARY KEY,
    DietPlanID INT NOT NULL,
    MealID INT NOT NULL,
    ServingSize DECIMAL(10,2), -- Bu, porsiyon büyüklüğü veya miktarı olabilir.
    MealType ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack') NOT NULL,
    FOREIGN KEY (DietPlanID) REFERENCES DietPlans(DietPlanID),
    FOREIGN KEY (MealID) REFERENCES Meals(MealID)
);
