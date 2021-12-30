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
  const {
    productID,
    editedName,
    editedSku,
    editedSlug,
    editedBrand,
    editedDescription,
    editedColor,
    editedMaterial,
    editedShape,
    editedGender,
    editedType,
    editedPrice,
    editedDiscountedPrice,
    editedStock,
    editedStatus,
  } = req.body;
  try {
    await db.connect();
    const product = await Product.findById({ _id: productID });
    const brand = await Brand.findOne({ name: editedBrand });

    const discountedPrice = editedDiscountedPrice ? editedDiscountedPrice : 0;

    product.name = editedName;
    product.sku = editedSku;
    product.slug = editedSlug;
    product.brand = brand;
    product.brandName = editedBrand;
    product.description = editedDescription;
    product.color = editedColor;
    product.material = editedMaterial;
    product.shape = editedShape;
    product.gender = editedGender;
    product.type = editedType;
    product.price = editedPrice;
    product.discountedPrice = discountedPrice;
    product.stock = editedStock;
    product.status = editedStatus;

    await product.save();

    await db.disconnect();

    res.status(200).send(product);
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
});

export default handler;
