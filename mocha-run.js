const Mocha = require('mocha');

var mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './docs/test',
    quiet: true
  }
});

mocha.addFile('./tests/service/home.spec.js');
mocha.addFile('./tests/service/admin.spec.js');

mocha.run(function () {
  process.exit();
});