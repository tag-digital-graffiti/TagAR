const router = require('express').Router()
const { Tag } = require('../db/models')
const sequelize = require('sequelize')
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
    let arTagUrl = req.body.arTagUrl

    await Tag.create({ lat, long, arTagUrl })
  } catch (error) {
    next(error)
  }
})
module.exports = router
