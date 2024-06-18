import axios from "axios";
import cheerio from "cheerio";

const getLaptops = async (count = 50) => {
    const baseUrl = `https://www.technodom.kz/catalog/noutbuki-i-komp-jutery/noutbuki-i-aksessuary/noutbuki?page=`;
    const laptops: {
        link: string;
        image: string;
        title: string;
        price: string;
    }[] = [];
    let page = 1;

    while (laptops.length < count) {
        try {
            const resp = await axios.get(baseUrl + page);
            const html = resp.data;
            const $ = cheerio.load(html);

            const pageLaptops: {
                link: string;
                image: string;
                title: string;
                price: string;
            }[] = [];

            $('[data-testid="category-page-list-item"]').each((index, element) => {
                if (laptops.length + pageLaptops.length < count) {
                    const product = {
                        link: "https://www.technodom.kz" + $(element).find('a').attr('href'),
                        image: "https://www.technodom.kz" + $(element).find('img').attr('src'),
                        title: $(element).find('[data-testid="product-title"]').text().trim(),
                        price: $(element).find('[data-testid="product-price"]').text().trim(),
                    };
                    pageLaptops.push(product);
                }
            });

            if ($('[data-testid="category-page-list-item"]').length === 0) {
                break;
            }

            page++;

            laptops.push(...pageLaptops);
        } catch (error) {
            console.error(`Error on page ${page}: ${error}`);
            break;
        }
    }

    return laptops;
};


export default getLaptops;
