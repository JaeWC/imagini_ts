// import path from 'path';
import db from '../services/MySQLHandler';
import s3Handler from '../services/s3Handler';

const photoController = {
  getPhoto: (req, res) => {
    if (!Object.keys(req.query).length) {
      db.query(`UPDATE photos SET date_used = UTC_TIMESTAMP WHERE id = ?`, [
        req.image.id
      ]);

      // res.setHeader(
      //   'Content-Type',
      //   'image/' + path.extname(req.image.data).substr(1)
      // );

      return res.json({ status: 'ok', link: req.image.photo_url });
    }
  },

  uploadPhoto: (req, res) => {
    db.query(
      `INSERT INTO photos SET ?`,
      {
        name: req.params.name,
        data: req.file.key,
        photo_url: req.file.location,
        size: req.file.size
      },
      err => {
        if (err) {
          return res.send({ status: 'error', code: err.code });
        }
        return res.json({ status: 'ok', imageUrl: req.file });
      }
    );
  },

  deletePhoto: async (req, res) => {
    console.log(1111, req.image);
    await s3Handler.deleteItem(req.image.data);
    db.query(`DELETE FROM photos WHERE id = ?`, [req.image.id], err => {
      if (err) {
        return res.status(500).end();
      }
      return res.status(200).json({ status: 'ok' });
    });
  }
};

export default photoController;
