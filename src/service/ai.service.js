import { GoogleGenAI } from "@google/genai";
import { connect } from "mongoose";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateResponse(content){
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:content,
    })
    return response.text;
}

export default generateResponse;