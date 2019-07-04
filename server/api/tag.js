const router = require('express').Router()
const { Tag } = require('../db/models')
const sequelize = require('sequelize')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'coolcaps',
  api_key: '851696833748766',
  api_secret: '6xc3M9VoKgFxcLO2apfGdu6e0xs'
})

const Op = sequelize.Op
router.get('/', async (req, res, next) => {
  const lat = parseFloat(req.query.lat)
  const long = parseFloat(req.query.long)

  try {
    const getNearByTag = await Tag.findAll({
      where: {
        lat: {
          [Op.between]: [lat - 0.0002, lat + 0.0002]
        },
        long: {
          [Op.between]: [long - 0.0002, long + 0.0002]
        }
      }
    }
    )
    res.json(getNearByTag)
  } catch (error) {
    next(error)
  }
})


router.post('/', async (req, res, next) => {
  try {
    let lat = req.body.lat;
    let long = req.body.long;
    let imageUri = req.body.imageUri;

    cloudinary.uploader.upload('ph://62964EE6-3BAB-49CE-A6DF-A7F27F37D921/L0/001.png', function (error, result) {
      console.log(result, error)
    })
    await Tag.create({ lat, long })
  } catch (error) {
    next(error)
  }
})
module.exports = router
