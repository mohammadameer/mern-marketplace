import Product from "../models/product.model";
import formidable from "formidable";
import fs from "fs";
import dbErrorHandler from "../helpers/dbErrorHandler";

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
