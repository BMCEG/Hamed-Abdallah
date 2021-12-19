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

  console.log('req.body', req.body);
  try {
    await db.connect();
    const brand = await Brand.findById({ _id: brandID });
    brand.name = editedName;
    await brand.save();

    console.log('brand', brand);
    for (let i = 0; i < brandProducts.length; i++) {
      console.log(brandProducts[i]._id);
      const product = await Product.findById({
        _id: brandProducts[i]._id,
      });
      console.log('here');
      product.brandName = editedName;
      console.log('here2');

      await product.save();
      console.log('here3');
      //   console.log(product);
    }

    console.log('brand', brand);

    await db.disconnect();

    res.status(200).send(brand);
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
});

export default handler;
