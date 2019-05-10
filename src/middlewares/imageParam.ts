import imageQuery from '../models/query/imageQuery';

const imageParam = (req, res, next, image) => {
  imageQuery.selectWithName([image], (err, images) => {
    if (err || !images.length) {
      return res.status(404).end();
    }

    req.image = images[0];

    return next();
  });
};

export default imageParam;
