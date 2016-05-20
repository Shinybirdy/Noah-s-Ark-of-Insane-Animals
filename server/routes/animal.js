var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animal', function (err, result) {
      done();
      console.log(result.rows);
      res.send(result.rows);
    });

  });

});

router.get('/*', function(req, res){
  var file=req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, "../public", file));

});

router.post('/', function (req, res) {
  var employee = req.body;
    pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
              }

    client.query('INSERT INTO animal (name, type, threat_level, amount) ' +
                  'VALUES ($1, $2, $3, $4,)',
                  [animal.name, animal.type, animal.threat_level, animal.amount],
                  function (err, result) {
                                            done();
                                            if (err) {
                                              res.sendStatus(500);
                                              return;
                                            }
                                            res.sendStatus(201);
                                          }
                );
    });

});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    client.query('DELETE FROM animal ' +
                  'WHERE id = $1',
                   [id],
                 function (err, result) {
                   done();
                   if (err) {
                     console.log(err);
                     res.sendStatus(500);
                     return;
                   }
                   res.sendStatus(200);
                 });
  });
});

module.exports = router;
