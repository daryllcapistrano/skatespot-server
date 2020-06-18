const Skatepark = require("../models/skatepark-model");

createSkatepark = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide skatepark data",
    });
  }

  const skatepark = new Skatepark(body);

  if (!skatepark) {
    return res.status(400).json({ success: false, error: err });
  }
  skatepark
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: skatepark._id,
        message: "Skatepark Added!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Skatepark not added",
      });
    });
};

updateSkatepark = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide data to update",
    });
  }

  Skatepark.findOne({ _id: req.params.id }, (err, skatepark) => {
    if (err) {
      return res.status(400).json({
        err,
        message: "Skatepark not found",
      });
    }
    skatepark.name = body.name;
    skatepark.terrian = body.terrian;
    skatepark.location = body.location;
    skatepark.city = body.city;
    skatepark.state = body.state;
    skatepark.country = body.country;
    skatepark.rating = body.rating;
    skatepark.save().then(() => {
      return res
        .status(200)
        .json({
          success: true,
          id: skatepark._id,
          message: "Skatepark updated",
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: "Skatepark not updated",
          });
        });
    });
  });
};

deleteSkatepark = async (req, res) => {
  await Skatepark.findOneAndDelete({ _id: req.params.id }, (err, skatepark) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!skatepark) {
      return res
        .status(404)
        .json({ success: false, error: "Skatepark not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        data: skatepark,
        message: "Skatepark deleted",
      })
      .catch((err) => console.log(err));
  });
};

getSkateparkById = async (req, res) => {
  await Skatepark.findOne({ _id: req.params.id }, (err, skatepark) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!skatepark) {
      return res
        .status(404)
        .json({ success: false, error: "Skatepark not found" });
    }
    return res.status(200).json({ success: true, data: skatepark });
  }).catch((err) => console.log(err));
};

getSkateparks = async (req, res) => {
  await Skatepark.find({}, (err, skateparks) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!skateparks.length) {
      return res
        .status(404)
        .json({ success: false, error: "Skatepark not found" });
    }
    return res.status(200).json({ success: true, data: skateparks });
  }).catch((err) => console.log(err));
};

module.exports = {
  createSkatepark,
  updateSkatepark,
  deleteSkatepark,
  getSkateparks,
  getSkateparkById,
};
