module.exports = {

  getData: async (req,res) => {
    console.log('getData server ping')
    const foundProduct = await req.app.get('db').get_product();
    console.log('returning products:')
    // console.log(foundProduct)
    return res.status(200).send(foundProduct);
  },

  updateData: async (req, res) =>{
    console.log('updateData server ping')
    
  }



}