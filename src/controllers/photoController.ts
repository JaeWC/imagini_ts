import s3Handler from '../services/s3Handler';
import imageQuery from '../models/query/imageQuery';

const photoController = {
  getPhoto: (req, res) => {
    if (!Object.keys(req.query).length) {
      imageQuery.updateUsedTime([req.image.id]);
      return res.json({ status: 'ok', link: req.image.photo_url });
    }
  },

  uploadPhoto: (req, res) => {
    imageQuery.insertNewPhoto(
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
    await s3Handler.deleteItem(req.image.data);
    imageQuery.deleteWithId([req.image.id], err => {
      if (err) {
        return res.status(500).end();
      }
      return res.status(200).json({ status: 'ok' });
    });
  }
};

export default photoController;
