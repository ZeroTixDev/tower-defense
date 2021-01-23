'use strict';

require('dotenv').config();
const fetch = require('node-fetch');

void fetch('https://version-api.zerotixdev.repl.co/' + process.env.UPDATE)
   .then((res) => res.json())
   .then((val) => console.log(`New Version: ${val?.version}`));
