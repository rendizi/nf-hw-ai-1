import Laptop from "./Models/laptop";
import getLaptops from "../scrapping/scrapper";

const saveLaptops = async () => {
    try {
        // Delete all existing laptops before saving new ones
        await Laptop.deleteMany({});

        // Retrieve new laptops
        const laptops = await getLaptops(50);
        console.log("LAPTOPS", laptops.length)

        // Save each new laptop
        for (const laptop of laptops) {
            const newLaptop = new Laptop(laptop);
            await newLaptop.save();
            console.log(`Saved laptop: ${laptop.title}`);
        }

        console.log('All laptops have been saved successfully!');
    } catch (err) {
        console.error('Error saving laptops:', err);
    }
};

export default saveLaptops;
