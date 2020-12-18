const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "lil_url",
});

connection.connect();

const findURL = (req, res) => {
  let shortenedPathname = req.query.url;

  connection.query(
    `SELECT * FROM encoded where pathname = "${shortenedPathname}";`,
    (err, data) => {
      if (err) {
        res.status(500).end();
      }
      if (data.length < 1) {
        saveURL(req, res, shortenedPathname);
      } else {
        res.status(500).end();
      }
    }
  );
};

const saveURL = (req, res, shortenedPathname) => {
  connection.query(
    `INSERT INTO encoded (pathname) VALUES ("${shortenedPathname}");`,
    (err, data) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send(data[0]);
    }
  );
};

const getCounter = function (req, res) {
  connection.query(`SELECT COUNT(ID) AS counter FROM encoded;`, (err, data) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(data[0]);
  });
};

exports.findURL = findURL;
exports.getCounter = getCounter;
