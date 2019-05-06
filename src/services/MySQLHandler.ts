import mysql from 'mysql';

const db = mysql.createConnection({
  host: process.env.LOCAL_HOST,
  user: process.env.LOCAL_USER,
  password: process.env.LOCAL_PASSWORD,
  database: process.env.LOCAL_DATABASE
});

db.connect(err => {
  if (err) throw err;

  db.query(
    `CREATE TABLE IF NOT EXISTS photos
	(
    id           INT(11)      UNSIGNED NOT NULL AUTO_INCREMENT,
    name         VARCHAR(255) NOT NULL,
    data         VARCHAR(255) NOT NULL,
    photo_url    VARCHAR(255) NOT NULL,
    size         INT(11)      UNSIGNED NOT NULL,
    date_created TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_used    TIMESTAMP    NULL DEFAULT NULL,
		PRIMARY KEY (id),
		UNIQUE KEY name (name)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8`
  );

  setInterval(() => {
    db.query(
      'DELETE FROM photos ' +
        'WHERE (date_created < UTC_TIMESTAMP - INTERVAL 1 WEEK AND date_used IS NULL) ' +
        '   OR (date_used < UTC_TIMESTAMP - INTERVAL 1 MONTH)'
    );
  }, 3600 * 1000);

  console.log(`✅ MySQL Database Connected`);
});

export default db;
