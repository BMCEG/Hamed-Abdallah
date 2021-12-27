import nc from 'next-connect';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error.js';
import { isAuth } from '../../../../utils/auth.js';
// import middleware from '../../../../middlewares/upload';
import Product from '../../../../models/Product';
import Brand from '../../../../models/Brand';

const handler = nc({
  onError,
});

// handler.use(middleware);
// handler.use(isAuth);

handler.post(async (req, res) => {
  console.log(req.body);
  const {
    name,
    description,
    brand,
    color,
    shape,
    slug,
    gender,
    material,
    sku,
    featuredImage,
    type,
    stock,
    price,
    status,
    images,
  } = req.body;

  await db.connect();

  const prodBrand = await Brand.findById({ _id: brand });

  try {
    const newProduct = new Product({
      name,
      description,
      brand,
      brandName: prodBrand.name,
      color,
      shape,
      sku,
      featuredImage,
      slug,
      gender,
      material,
      type,
      stock,
      price,
      status,
      images,
    });
    await newProduct.save();

    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error });
  }
});

export default handler;
