const router = require('express').Router();
const { Tag } = require('../db/models');
const sequelize = require('sequelize');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'coolcaps',
  api_key: '851696833748766',
  api_secret: '6xc3M9VoKgFxcLO2apfGdu6e0xs'
});

const Op = sequelize.Op;
router.get('/', async (req, res, next) => {
  const lat = parseFloat(req.query.lat);
  const long = parseFloat(req.query.long);
  try {
    const getNearByTag = await Tag.findAll({
      where: {
        lat: {
          [Op.between]: [lat - 0.002, lat + 0.002]
        },
        long: {
          [Op.between]: [long - 0.002, long + 0.002]
        }
      }
    });
    res.json(getNearByTag);
  } catch (error) {
    next(error);
  }
});

router.get('/tags', async (req, res, next) => {
  try {
    const allTags = await Tag.findAll();
    if (allTags) {
      res.json(allTags);
    } else {
      next();
    }
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
    let imageData = req.body.imageData;

    await cloundinary.uploader(imageData, async function(error, result) {
      if (result) {
        const arTagUrl = result.url;
        try {
          await Tag.create({ lat, long, arTagUrl });
        } catch (error) {
          next(error);
        }
      }
    });
    res.end();
  } catch (error) {
    next(error);
  }
});
module.exports = router;
