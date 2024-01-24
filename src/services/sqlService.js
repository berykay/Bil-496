import sql from 'mssql/msnodesqlv8';
import { sqlConfig, baseUrl, apiKey } from '../config/sql.js';

async function fetchCategoryData(category) {
  const response = await fetch(`${baseUrl}${category}`, {
    headers: {
      'X-Api-Key': apiKey
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

async function insertNutritionData(category, pool) {
  const apiConfig = sqlConfig.api;
  try {
    const data = await fetchCategoryData(category, apiConfig);
    
    for (let item of data.items) {
      await pool.request()
        .input('food_name', sql.VarChar, item['name'])
        // ... add other parameters similarly
        .query(`INSERT INTO food_nutrition (
                  food_name, sugar_g, fiber_g, serving_size_g, sodium_mg, potassium_mg,
                  fat_saturated_g, fat_total_g, calories, cholesterol_mg, protein_g,
                  carbohydrates_total_g
                ) VALUES (
                  @food_name, @sugar_g, @fiber_g, @serving_size_g, @sodium_mg, @potassium_mg,
                  @fat_saturated_g, @fat_total_g, @calories, @cholesterol_mg, @protein_g,
                  @carbohydrates_total_g
                )`);
    }
  } catch (error) {
    console.error(`Error fetching or inserting data for category ${category}:`, error);
  }
}

async function connectAndInsertData(categories) {
  try {
    let pool = await sql.connect(sqlConfig);
    
    for (let category of categories) {
      await insertNutritionData(category, pool);
    }
  } catch (err) {
    console.error('SQL connection error', err);
  } finally {
    await sql.close();
  }
}

module.exports = {
  connectAndInsertData
};
