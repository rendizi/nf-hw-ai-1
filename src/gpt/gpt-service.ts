import openai from '../openai';
import { Laptop } from './gpt-types';
import OpenAI from "openai";
import LaptopService from "../scrapping/laptop-service";
import {parse} from "best-effort-json-parser";

const systemPrompt = `
You are professional IT guy who suggests his customers different laptops. 
You should provide a 4 laptops to buy that satisfies customer's needs.
A laptop should contain a brief description of the laptop, laptop model,image,link and price. 
Please, return your response in following array JSON format: 

[
    {
      "title": "Model of laptop with short tech description",
      "price": "Laptop Name",
      "description": "Description of the laptop and why it is the best for particulary this buyer",
      "link":"link to the laptop(take from prompt)".
      "image":"link to the image of laptop"
    }
  ]

If user prompt is irrelevant return empty array of books. Give response based on following laptops:
`;

class GptService {
  async getLaptops(userPrompt: string) {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const laptopService = new LaptopService()
      const laptops = await laptopService.getLaptops();

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt+laptops.toString(),
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: userPrompt,
              },
            ],
          },
        ],
        response_format: {
          type: 'json_object',
        },      });

      //let resJson = ""

      /*for await (const chunk of response) {
        const cur = chunk.choices[0]?.delta?.content || ''
        resJson += cur
        process.stdout.write(parse(resJson));
      }*/

     /*let accumulatedData = '';

      for await (const chunk of response) {
        const data = chunk.choices[0]?.delta?.content || '';
        accumulatedData += data
        process.stdout.write(data);

        let start, end;
        while ((start = accumulatedData.indexOf('{')) !== -1 && (end = accumulatedData.indexOf('}', start)) !== -1) {
          const jsonStr = accumulatedData.substring(start, end + 1);
          accumulatedData = accumulatedData.slice(end + 1);

          try {
            const parsedObject = JSON.parse(jsonStr);
          } catch (e) {
            console.log(accumulatedData)
console.log(e)
          }
        }
      }*/

      const resJson: string | null = response.choices[0].message.content;
      if (resJson) {
        const parsedRes = JSON.parse(resJson);
        return parsedRes.laptops as Laptop[];
      } else {
        return null;
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }
}

export default GptService;
