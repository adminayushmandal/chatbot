import {z} from "zod";
import {ApiError, GoogleGenAI} from "@google/genai";
import {zodToJsonSchema} from "zod-to-json-schema";

const ingredients = z.object({
    name: z.string().describe("The name of the ingredient"),
    quantity: z.string().describe("The quantity of the ingredient")
})

const recipeSchema = z.object({
    recipe_name: z.string().describe("The name of the recipe"),
    prep_per_minutes: z.number().describe("The preparation time in minutes"),
    ingredients: z.array(ingredients).describe("The ingredients required for the recipe"),
    instructions: z.array(z.string()).describe("The list of instructions for preparing the recipe")
})

const ai = new GoogleGenAI({
    apiKey: "AIzaSyDtor1Ggp_FLEMwe1E31HgNwcwnVI1Ku7o"
})

const prompt = `
Please extract the recipe from the following text.
The user wants to make delicious chocolate chip cookies.
They need 2 and 1/4 cups of all-purpose flour, 1 teaspoon of baking soda,
1 teaspoon of salt, 1 cup of unsalted butter (softened), 3/4 cup of granulated sugar,
3/4 cup of packed brown sugar, 1 teaspoon of vanilla extract, and 2 large eggs.
For the best part, they'll need 2 cups of semisweet chocolate chips.
First, preheat the oven to 375°F (190°C). Then, in a small bowl, whisk together the flour,
baking soda, and salt. In a large bowl, cream together the butter, granulated sugar, and brown sugar
until light and fluffy. Beat in the vanilla and eggs, one at a time. Gradually beat in the dry
ingredients until just combined. Finally, stir in the chocolate chips. Drop by rounded tablespoons
onto ungreased baking sheets and bake for 9 to 11 minutes.
`;

export const generateRecipe = async () => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: zodToJsonSchema(recipeSchema)
            }
        })
        if (!response.text) {
            throw new Error("No response text")
        }
        return recipeSchema.parse(JSON.parse(response.text))

    } catch (error) {
        if (error instanceof ApiError) {
            console.log(error.message)
        }
    }
}