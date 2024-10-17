// section: code
import { CloudantV1 } from '@ibm-cloud/cloudant';

const service = CloudantV1.newInstance({});

const productsDoc: CloudantV1.Document = {
  _id: '1000042',
  type: 'product',
  productId: '1000042',
  brand: 'Salter',
  name: 'Digital Kitchen Scales',
  description: 'Slim Colourful Design Electronic Cooking Appliance for Home / Kitchen, Weigh up to 5kg + Aquatronic for Liquids ml + fl. oz. 15Yr Guarantee - Green',
  price: 14.99,
  image: 'assets/img/0gmsnghhew.jpg'
};

service.postDocument({
  db: 'products',
  document: productsDoc
}).then(response => {
  console.log(response.result);
});
