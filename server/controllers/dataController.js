module.exports = {

  getData: async (req,res) => {
    console.log('getData server ping')
    const {id} = req.body;
    console.log(id)
    const foundData = await req.app.get('db').get_user_data([id]);
    const data = foundData[0];
    if(!data){
      console.log(`Data not found for user #${id}`)
      return res.status(404).send({userDataStashed: false})
    }
    console.log(`returning data for user ${id}`)
    return res.status(200).send({userDataStashed: true, data});
  },

  saveData: async (req, res) =>{
    console.log('saveData server ping')
    const {id, userData} = req.body;
    // console.log(id, userData);
    const newData = await req.app.get('db').save_data([id, userData]);
    // console.log(newData);
    return res.status(200).send(newData)
  }



}