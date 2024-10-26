const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "create a kids story on description for 5-8 years kids, Educational Story and all images in paper cut style : Story of Boy and Magic school, give me 5 chapters with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"story\": {\n    \"title\": \"The Boy Who Went to Magic School\",\n    \"cover\": {\n      \"image_prompt\": \"Paper cut style illustration of a young boy with wide eyes, wearing a blue backpack, standing in front of a glowing, magical school building with whimsical towers and a large, colorful sign that reads 'Magic School' in swirling letters. There should be stars and sparkles in the background.\",\n      \"description\": \"A magical school with colorful towers and stars sparkling in the night sky. A boy with a backpack stands in front of it, looking up in awe.\"\n    },\n    \"chapters\": [\n      {\n        \"chapter_number\": 1,\n        \"title\": \"A Curious Boy\",\n        \"image_prompt\": \"Paper cut style illustration of a boy with brown hair and curious eyes, sitting at a desk and looking at a book about magic with pictures of spells and potions. There should be a magnifying glass next to him and scattered papers with scribbles of magic words.\",\n        \"description\": \"A boy, engrossed in a book about magic, his eyes wide with wonder as he reads about spells and potions.\"\n      },\n      {\n        \"chapter_number\": 2,\n        \"title\": \"The Mysterious Invitation\",\n        \"image_prompt\": \"Paper cut style illustration of a magical owl with large, golden eyes carrying a rolled-up scroll with a red wax seal in its beak. The owl is flying towards the boy who is looking up in surprise, holding the book of magic in his hands.\",\n        \"description\": \"A magical owl with a scroll in its beak, delivering an invitation to the boy who is excited and surprised.\"\n      },\n      {\n        \"chapter_number\": 3,\n        \"title\": \"Welcome to Magic School\",\n        \"image_prompt\": \"Paper cut style illustration of the boy standing in front of the magical school, looking at a colorful array of magical creatures, including talking animals, a unicorn, a dragon, and a mischievous fairy. He is smiling, feeling excited and a bit overwhelmed.\",\n        \"description\": \"The boy is surrounded by magical creatures at the entrance of the school, all greeting him with smiles and waves.\"\n      },\n      {\n        \"chapter_number\": 4,\n        \"title\": \"Learning Magic\",\n        \"image_prompt\": \"Paper cut style illustration of the boy practicing magic with other children, levitating objects, making flowers bloom, and creating colorful rainbows. A smiling teacher with a wizard hat and a long beard watches them with pride.\",\n        \"description\": \"Children are learning magic in the classroom, practicing spells, levitating objects, and having fun while a wise teacher guides them.\"\n      },\n      {\n        \"chapter_number\": 5,\n        \"title\": \"A Magical Adventure\",\n        \"image_prompt\": \"Paper cut style illustration of the boy riding a magical broomstick with his friends through a starry night sky, flying over a castle with a dragon, and encountering friendly fairies and magical creatures along the way. The boy is smiling and laughing, enjoying the adventure.\",\n        \"description\": \"The boy and his friends are soaring through the sky on their magical broomsticks, enjoying a magical adventure with friendly creatures.\"\n      }\n    ]\n  }\n}\n``` \n"},
          ],
        },
      ],
    });
  