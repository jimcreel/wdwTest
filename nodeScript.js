const PythonShell = require('python-shell').PythonShell;

var options = {
  mode: 'text',
  pythonPath: 'magicResAPI.py',
  pythonOptions: ['-u'],
  scriptPath: '',
  args: ['value1', 'value2', 'value3']
};

PythonShell.run('my_script.py', options, function (err, results) {
  if (err) 
    throw err;
  // Results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});