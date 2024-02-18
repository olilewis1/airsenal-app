const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import the fs module
const app = express();
const port = 3001;
const { exec } = require('child_process');
const { stderr } = require('process');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// execute predictions

app.post('/run-script', (req, res) => {
  console.log('Starting script execution...');

  // Execute the first shell script
  exec('./airsenal_run_prediction.sh 3705355', (error, stdout, stderr) => {
    console.log('First script execution completed.');

    if (error) {
      console.error(`Error: ${error} : ${stdout}`);
      return res.status(500).json({ error: 'First script execution failed' });
    }

    // Read the contents of the output file of the first script
    fs.readFile('output_predictions.log', 'utf8', (readError, data) => {
      if (readError) {
        console.error(`Error reading output file: ${readError}`);
        return res.status(500).json({ error: 'First script execution succeeded, but failed to read output' });
      }

      // Execute the second shell script
      exec('./airsenal_run_optimization.sh ' + data, (secondError, secondStdout, secondStderr) => {
        console.log('Second script execution completed.');

        if (secondError) {
          console.error(`Error: ${secondError} : ${secondStdout}`);
          return res.status(500).json({ error: 'Second script execution failed' });
        }

        // Return the output of the second script in the response
        res.json({ message: 'Scripts executed successfully', output: secondStdout });
      });
    });
  });
});


// return predictions only 
app.post('/return-predictions' , (req, res) => {

  console.log('Starting script execution...');



    // Read the contents of the output file
    fs.readFile('output_predictions.log', 'utf8', (readError, data) => {
      if (readError) {
        console.error(`Error reading output file: ${readError}`);
        return res.status(500).json({ error: 'Script execution succeeded, but failed to read output' });
      }

      // Return the output in the response
      res.json({ message: 'Script executed successfully', output: data });
    });
  });

// run optimization

app.post('/run-optimization', (req, res) => {
  const { fplId: id, login: email, password } = req.body;

  // Execute the first script to set variables
  exec(`./airsenal_set_variables.sh ${password} ${email} ${id}`, (error, stdout, stderr) => { 
    if (error) {
      console.error(`Error executing set_variables script: ${error}`);
      return res.status(500).json({ error: 'Script execution failed' });
    }

    console.log('Variables set successfully');

    // Execute the optimization script with the id parameter
    exec(`./airsenal_run_optimization.sh ${id}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing optimization script: ${error}`);
        return res.status(500).json({ error: 'Script execution failed' });
      }

      // Read the contents of the output file
      fs.readFile('output_optimization.log', 'utf8', (readError, data) => {
        if (readError) {
          console.error(`Error reading output file: ${readError}`);
          return res.status(500).json({ error: 'Script execution succeeded, but failed to read output' });
        }
        // console.log(`Script output: ${data}`);

        // Return the output in the response
        res.json({ message: 'Script executed successfully', output: data });
      });
    });
  });
});

// run optimization
app.post('/return-optimization', (req, res) => {
  console.log('req', req.body)
  
      // Read the contents of the output file
      fs.readFile('output_optimization.log', 'utf8', (readError, data) => {
        if (readError) {
          console.error(`Error reading output file: ${readError}`);
          return res.status(500).json({ error: 'Script execution succeeded, but failed to read output' });
        }
       console.log('Completed reading of file')
  
        // Return the output in the response
        res.json({ message: 'Script executed successfully', output: data });
      });
    });
app.listen(3000, () => { 
  console.log('Server is running on port 3000');
});