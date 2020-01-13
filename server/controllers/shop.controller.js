import formidable from "formidable";
import Shop from "../models/shop.model";
import fs from "fs";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { extend } from "lodash";

export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be uploaded"
      });
    }
    let shop = new Shop(fields);
    shop.owner = req.profile;
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image.path);
      shop.image.contentType = files.image.type;
    }
    shop.save((err, result) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });

      res.status(200).json(result);
    });
  });
};

export const remove = (req, res) => {
  let shop = req.shop;
  shop.remove((err, deletedShop) => {
    if (err)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });

    res.json(deletedShop);
  });
};

export const read = (req, res) => {
  return res.json(req.shop);
};

export const shopById = (req, res, next, id) => {
  Shop.findById(id)
    .populate("owner", "_id name")
    .exec((err, shop) => {
      if (err || !shop)
        return res.status(400).json({
          error: "Shop not found"
        });

      req.shop = shop;
      next();
    });
};

export const list = (req, res) => {
  Shop.find((err, shops) => {
    if (err)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });

    res.json(shops);
  });
};

export const listByOwner = (req, res) => {
  Shop.find({ owner: req.profile._id }, (err, shops) => {
    if (err)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });

    res.json(shops);
  }).populate("owner", "_id name");
};

export const image = (req, res, next) => {
  if (req.shop.image.data) {
    res.set("Content-Type", req.shop.image.contentType);
    res.send(req.shop.image.data);
  }
  next();
};

export const isOwner = (req, res, next) => {
  const isOwner = req.shop && req.auth && req.shop.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

export const update = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(files);
    if (err)
      res.status(400).json({
        error: "Image can't be uploaded"
      });

    let shop = req.shop;

    shop = extend(shop, fields);
    shop.updated = Date.now();
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image.path);
      shop.image.contentType = files.image.type;
    }
    shop.save(err => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });
      res.json(shop);
    });
  });
};
