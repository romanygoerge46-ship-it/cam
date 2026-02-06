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
    أنت خبير تغذية عالمي. قم تحليل صورة الطعام هذه بدقة عالية.
    
    بيانات المستخدم (لتقديم نصيحة مخصصة):
    - الاسم: ${user.name}
    - الوزن: ${user.weight} كجم
    - الطول: ${user.height} سم
    - العمر: ${user.age} سنة

    المطلوب:
    1. تعرف على نوع الطعام ومكوناته.
    2. قدر السعرات الحرارية الإجمالية.
    3. قدر القيم الغذائية (بروتين، كارب، دهون) بالأرقام.
    4. قدم نصيحة صحية مفيدة ومختصرة جداً موجهة لهذا المستخدم بأسلوب مشجع.
    
    يجب أن يكون الرد بنسق JSON فقط.
  `;

  try {
    // Using gemini-3-flash-preview as it is multimodal and optimized for text/image understanding
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
        temperature: 0.3, // Lower temperature for accuracy
      }
    });

    const text = response.text;
    if (!text) throw new Error("لم يتم استلام رد من الخادم");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error details:", error);
    throw new Error("حدث خطأ أثناء الاتصال بخدمة التحليل. تأكد من اتصال الإنترنت.");
  }
};