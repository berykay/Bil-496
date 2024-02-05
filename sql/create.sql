-- User Tablosu
CREATE TABLE User (
    UserID VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(255),
    NewUser BOOLEAN DEFAULT TRUE;
    Email VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other'),
    Age INT,
    Height INT,
    Weight INT,
    ActivityLevel ENUM('Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active') DEFAULT 'Lightly Active',
    ADD COLUMN RegionID INT,
    ADD COLUMN AllergenID INT,
    ADD FOREIGN KEY (AllergenID) REFERENCES Allergen(AllergenID);
    ADD FOREIGN KEY (RegionID) REFERENCES Region(RegionID);
);

CREATE TABLE Goal (
    GoalID INT AUTO_INCREMENT PRIMARY KEY,
    GoalName VARCHAR(255) NOT NULL
);
CREATE TABLE DietPreference(
    DietPreferenceID INT AUTO_INCREMENT PRIMARY KEY,
    DietPreferenceName VARCHAR(255) NOT NULL
);

-- Region Tablosu
CREATE TABLE Region (
    RegionID INT AUTO_INCREMENT PRIMARY KEY,
    Country VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL
);

-- HealthCondition Tablosu
CREATE TABLE HealthCondition (
    ConditionID INT AUTO_INCREMENT PRIMARY KEY,
    ConditionName VARCHAR(255) NOT NULL
);

-- FoodComponent Tablosu
CREATE TABLE FoodComponent (
    ComponentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Measure VARCHAR(50) NOT NULL,
    Calories INT NOT NULL,
    Carbs DECIMAL(10,2) NOT NULL,
    Fats DECIMAL(10,2) NOT NULL,
    Proteins DECIMAL(10,2) NOT NULL,
    Category VARCHAR(255) NOT NULL,
    RegionID INT,
    FOREIGN KEY (RegionID) REFERENCES Region(RegionID)
);

-- Meal Tablosu
CREATE TABLE Meal (
    MealID INT AUTO_INCREMENT PRIMARY KEY,
    MealName VARCHAR(255) NOT NULL,
    Category VARCHAR(255) NOT NULL,
    RegionID INT,
    FOREIGN KEY (RegionID) REFERENCES Region(RegionID)
);

-- MealComponent Tablosu
CREATE TABLE MealComponent (
    MealComponentID INT AUTO_INCREMENT PRIMARY KEY,
    MealID INT NOT NULL,
    ComponentID INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (MealID) REFERENCES Meal(MealID),
    FOREIGN KEY (ComponentID) REFERENCES FoodComponent(ComponentID)
);

-- Allergen Tablosu
CREATE TABLE Allergen (
    AllergenID INT AUTO_INCREMENT PRIMARY KEY,
    AllergenName VARCHAR(255) NOT NULL
);

-- ComponentAllergen Tablosu
CREATE TABLE ComponentAllergen (
    ComponentID INT NOT NULL,
    AllergenID INT NOT NULL,
    FOREIGN KEY (ComponentID) REFERENCES FoodComponent(ComponentID),
    FOREIGN KEY (AllergenID) REFERENCES Allergen(AllergenID),
    PRIMARY KEY (ComponentID, AllergenID)
);

-- FoodPreference Tablosu
CREATE TABLE FoodPreference (
    PreferenceID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ComponentID INT NOT NULL,
    PreferenceType ENUM('Like', 'Dislike') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (ComponentID) REFERENCES FoodComponent(ComponentID)
);

-- UserMeal Tablosu
CREATE TABLE UserMeal (
    UserMealID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    MealID INT NOT NULL,
    Frequency INT DEFAULT 1,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (MealID) REFERENCES Meal(MealID)
);

-- UserAllergy Tablosu
CREATE TABLE UserAllergy (
    UserID INT NOT NULL,
    AllergenID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (AllergenID) REFERENCES Allergen(AllergenID),
    PRIMARY KEY (UserID, AllergenID)
);

-- DietPlan Tablosu
CREATE TABLE DietPlan (
    DietPlanID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    PlanDate DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- DietPlanDetail Tablosu
CREATE TABLE DietPlanDetail (
    DetailID INT AUTO_INCREMENT PRIMARY KEY,
    DietPlanID INT NOT NULL,
    MealID INT NOT NULL,
    ServingSize DECIMAL(10,2),
    MealType ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack') NOT NULL,
    FOREIGN KEY (DietPlanID) REFERENCES DietPlan(DietPlanID),
    FOREIGN KEY (MealID) REFERENCES Meal(MealID)
);
