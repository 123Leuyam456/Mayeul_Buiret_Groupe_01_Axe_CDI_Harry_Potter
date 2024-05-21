function fetchInfoCard(carte) {
    return fetch('https://hp-api.lainocs.fr/characters/'+ carte)
        .then(response => response.json())
  }
  
    
class HouseController {
  async maison(carte, res) {
    try {
      const data = await fetchInfoCard(carte)
      console.log(data.house);
      house = data.house;
    
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}




  
module.exports = new HouseController();


