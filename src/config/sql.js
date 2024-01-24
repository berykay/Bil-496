const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
      encrypt: true, // Necessary for Azure SQL
      trustServerCertificate: false // Set to true for local development
    }
  };

const baseUrl = 'https://api.calorieninjas.com/v1/nutrition?query=';
const apiKey = 'r2eYKGEpeVZ6HrHQc66J0A==TBZplKv8ZjoVuaTv';
  
  export {sqlConfig, baseUrl, apiKey};