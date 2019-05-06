import db from '../services/MySQLHandler';

const imageParam = (req, res, next, image) => {
  db.query(`SELECT * FROM photos WHERE name = ?`, [image], (err, images) => {
    if (err || !images.length) {
      return res.status(404).end();
    }

    req.image = images[0];

    return next();
  });
};

export default imageParam;
