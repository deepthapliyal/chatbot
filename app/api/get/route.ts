const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
export async function POST(request: Request) {
    const {prompt} = await request.json()
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;   
    const data = response.text()
    return Response.json({ data })
  }