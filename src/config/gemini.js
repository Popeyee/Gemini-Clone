// const apiKey = "AIzaSyBhXT23AMBh4h9DiTT4xu4rc4WwFGORLW0";

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBhXT23AMBh4h9DiTT4xu4rc4WwFGORLW0",
  });
  const tools = [
    {
      googleSearch: {},
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    tools,
  };
  const model = "gemini-2.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const res = (dat) => {
    let num = dat.map((item) => item.text);
    return num;
  };
  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  let finalOutput = "";
  for await (const chunk of response) {
    finalOutput += chunk.text;
    fileIndex++;
  }
  //   console.log(typeof finalOutput);
  return finalOutput;
  //   let cleaned = finalOutput;

  //   // 1️⃣ Replace double **text** with <b>text</b>
  //   cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  //   // 2️⃣ Replace single * at the start of a line with <br>
  //   cleaned = cleaned.replace(/^\*\s*/gm, "<br>");

  //   return cleaned;
}

export default main;
