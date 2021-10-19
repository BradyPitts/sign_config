module.exports = {

  getData: async (req,res) => {
    console.log('getData server ping')
    const {id} = req.body;
    console.log(id)
    const foundData = await req.app.get('db').get_user_data([id]);
    const data = foundData[0];
    if(!data){
      console.log(`Data not found for user #${id}`)
      return res.status(404).send(`User #${id}'s data not found`)
    }
    console.log(`returning data for user ${id}`)
    return res.status(200).send({userDataStashed: true, data});
  },

  updateData: async (req, res) =>{
    console.log('updateData server ping')
    
  }



}