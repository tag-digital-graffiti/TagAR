const router = require('express').Router();
const { Tag } = require('../db/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

router.get('/', async (req, res, next) => {
  const reqLat = parseFloat(req.query.lat);
  const reqLong = parseFloat(req.query.long);
  console.log(reqLat, 'request lat', reqLong, 'request long');
  try {
    const getNearByTag = await Tag.findAll({
      where: {
        lat: {
          [Op.between]: [reqLat - 0.02, reqLat + 0.02]
        },
        long: {
          [Op.between]: [reqLong - 0.02, reqLong + 0.02]
        }
      }
    });
    res.json(getNearByTag);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const selectedTag = await Tag.findOne({
      where: {
        id: req.params.id
      }
    });
    if (selectedTag) {
      res.json(selectedTag);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let lat = req.body.lat;
    let long = req.body.long;
    let arTagUrl = req.body.arTagUrl;

    await Tag.create({ lat, long, arTagUrl });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
