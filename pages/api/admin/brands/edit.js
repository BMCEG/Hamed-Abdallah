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
handler.use(isAuth);

handler.post(async (req, res) => {
  const { brandID, editedName, brandProducts } = req.body;

  try {
    await db.connect();
    const brand = await Brand.findById({ _id: brandID });
    brand.name = editedName;
    await brand.save();

    for (let i = 0; i < brandProducts.length; i++) {
      const product = await Product.findById({
        _id: brandProducts[i]._id,
      });
      product.brandName = editedName;

      await product.save();
    }


    await db.disconnect();

    res.status(200).send(brand);
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
});

export default handler;
