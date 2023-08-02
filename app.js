const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 


const yamlFilePath = 'dataform1.yaml';


const loadDataFromYaml = () => {
  try {
    const fileContents = fs.readFileSync(yamlFilePath, 'utf8');
    return yaml.safeLoad(fileContents) || [];
  } catch (error) {
    console.error('Error reading or parsing YAML file:', error);
    return [];
  }
};


app.get('/api/data', (req, res) => {
  const data = loadDataFromYaml();
  res.json(data);
});

app.post('/api/data', (req, res) => {
  const newItem = req.body;
  const data = loadDataFromYaml();
  data.push(newItem); 
  fs.writeFileSync(yamlFilePath, yaml.dump(data));
  res.status(201).json(newItem); 
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

