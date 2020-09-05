import axios from 'axios';

const createSalesforInstance = salesforceOptions => {

  var sales = {
    catalog: async () => {
      let {data} = await axios.get('https://demo-ocapi.demandware.net/s/SiteGenesis/dw/shop/v20_9/categories/root?levels=2&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      return {
        data
      }
    },

    products: async (category) => {
      /* Refined
      ** https://demo-ocapi.demandware.net/s/SiteGenesis/dw/shop/v20_9/product_search/images?refine_1=cgid%3Dnewarrivals&refine_2=cgid=mens&refine_3=c_isNew=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa **
      */

      let {data} = await axios.get(`${salesforceOptions.HOST}/s/${salesforceOptions.SITE}/dw/shop/${salesforceOptions.API}/product_search/images?refine_1=cgid=${category}&client_id=${salesforceOptions.CLIENT_ID}`)
      return {
        data
      }
    }


  }



  return sales;
}


export default (context, inject) => {
  const salesforce = createSalesforInstance({
    HOST: process.env.SFCC_HOST,
    CLIENT_ID: process.env.SFCC_CLIENT_ID,
    SITE: process.env.SFCC_SITE,
    APIs: process.env.SFCC_API
  })

  /* Inject Salesforce to te context as $saleforce */

  context.$salesforce = salesforce;

  inject('salesforce', salesforce)
}
