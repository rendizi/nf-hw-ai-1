import LaptopModel from "./Models/laptop"

class LaptopService {
    getLaptops(){
        try{
            const data = LaptopModel.find()
            return data}
        catch(error){
            throw error
        }
    }
}

export default LaptopService