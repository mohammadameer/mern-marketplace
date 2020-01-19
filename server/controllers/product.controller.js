import Product from "../models/product.model";
import formidable from "formidable";
import fs from "fs";
import dbErrorHandler from "../helpers/dbErrorHandler";
import webpackNodeExternals from "webpack-node-externals";
import { extend } from "lodash";

export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err)
      return res.status(400).json({
        error: "Image could not be uploaded"
      });

    let product = new Product(fields);
    product.shop = req.shop;
    if (files.image) {
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }
    product.save((err, result) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });

      res.json(result);
    });
  });
};

export const read = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err)
      return res.status(400).json({
        error: "photo is not found"
      });

    let product = req.product;
    product = extend(product, fields);
    product.updated = Date.now();
    if (files.image) {
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }
    product.save((err, result) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });

      res.json(product);
    });
  });
};

export const remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });

    res.json(deletedProduct);
  });
};

export const list = (req, res) => {
  const query = {};
  if (req.query.search)
    query.name = { $regex: req.query.search, $options: "i" };
  if (req.query.category && req.query.category != "All")
    query.category = req.query.category;

  Product.find(query, (err, products) => {
    if (err)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });

    res.json(products);
  })
    .populate("shop", "_id name")
    .select("-image");
};

export const listByShop = (req, res) => {
  Product.find({ shop: req.shop._id })
    .populate("shop", "_id name")
    .select("-image")
    .exec((err, products) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });
      res.json(products);
    });
};

export const listLatest = (req, res) => {
  Product.find({})
    .sort("-created")
    .limit(5)
    .select("-image")
    .populate("shop", "_id name")
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({
          error: "hmmmm"
        });
      }

      res.json(products);
    });
};

export const productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("shop", "_id name")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });
      }

      req.product = product;
      next();
    });
};

export const listRelated = (req, res) => {
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(5)
    .populate("shop", "_id name")
    .exec((err, products) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });

      res.json(products);
    });
};

export const listCategories = (req, res) => {
  Product.distinct("category", {}, (err, product) => {
    if (err || !product)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });

    res.json(product);
  });
};

export const image = (req, res, next) => {
  if (req.product.image) {
    res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};
