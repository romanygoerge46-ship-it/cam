import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    foodName: { type: Type.STRING, description: "اسم الطعام باللغة العربية" },
    calories: { type: Type.NUMBER, description: "تقدير السعرات الحرارية التقريبي" },
    macros: {
      type: Type.OBJECT,
      properties: {
        protein: { type: Type.STRING, description: "كمية البروتين (مثال: 20g)" },
        carbs: { type: Type.STRING, description: "كمية الكربوهيدرات (مثال: 30g)" },
        fats: { type: Type.STRING, description: "كمية الدهون (مثال: 10g)" },
      },
      required: ["protein", "carbs", "fats"]
    },
    advice: { type: Type.STRING, description: "نصيحة غذائية قصيرة بناءً على بيانات المستخدم ومحتوى الصورة" }
  },
  required: ["foodName", "calories", "macros", "advice"]
};

export const analyzeFoodImage = async (base64Image: string, user: UserProfile): Promise<AnalysisResult> => {
  // Detect MIME type from the data URL (e.g., data:image/png;base64,...)
  const mimeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
  
  // Clean base64 string by removing the header
  const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

  const prompt = `
    حلل صورة الطعام هذه.
    بيانات المستخدم:
    الاسم: ${user.name}
    الوزن: ${user.weight} كجم
    الطول: ${user.height} سم
    العمر: ${user.age} سنة

    المطلوب:
    1. تعرف على نوع الطعام.
    2. قدر السعرات الحرارية.
    3. قدر القيم الغذائية (بروتين، كارب، دهون).
    4. قدم نصيحة صحية قصيرة جداً ومخصصة لهذا المستخدم بناءً على سنه ووزنه.
    
    يجب أن يكون الرد باللغة العربية حصراً وبنسق JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4, // Lower temperature for more factual estimation
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("حدث خطأ أثناء تحليل الصورة. حاول مرة أخرى.");
  }
};