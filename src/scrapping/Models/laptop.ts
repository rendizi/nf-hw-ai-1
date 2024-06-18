import mongoose from 'mongoose';

const laptopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    }
});

const Laptop = mongoose.model('Laptop', laptopSchema);

export default Laptop;
