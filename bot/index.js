const fs = require('fs');
const scripts = [
  'userlogs.js',
  'channellog.js',
];

scripts.forEach((script) => {
  const scriptContent = fs.readFileSync(script, 'utf8');
  eval(scriptContent);
});
