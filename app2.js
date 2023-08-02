const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes (for development purposes)

// Define the path to the YAML file
const yamlFilePath = 'dataform2.yaml';

// Function to load and parse the YAML file
const loadDataFromYaml = () => {
  try {
    const fileContents = fs.readFileSync(yamlFilePath, 'utf8');
    return yaml.safeLoad(fileContents) || [];
  } catch (error) {
    console.error('Error reading or parsing YAML file:', error);
    return [];
  }
};

// Define API endpoint to get YAML data as JSON
app.get('/api/data', (req, res) => {
  const data = loadDataFromYaml();
  res.json(data);
});

// Define API endpoint to add new item to YAML data
app.post('/api/data', (req, res) => {
  const newItem = req.body; // The new item received in the request body
  const data = loadDataFromYaml();
  data.push(newItem); // Add the new item to the existing data
  // Save the updated data back to the YAML file (optional)
  fs.writeFileSync(yamlFilePath, yaml.dump(data));
  res.status(201).json(newItem); 
});

const port = 3002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});