/**
 * AI Description Generator using Gemini 1.5 Flash
 * Part of Mudalali Mama 2.0 - Phase 2
 */

export async function generateProductDescription(productName) {
    // ⚠️ SECURITY WARNING (Phase 4):
    // දැනට Testing සඳහා API Key එක මෙතන දාන්න. 
    // නමුත් Production (Live) දානකොට මෙය Firebase Cloud Functions හරහා යැවිය යුතුයි.
    const apiKey = "AIza..."; // <--- ඔයාගේ ඇත්ත API Key එක මෙතනට පේස්ට් කරන්න (Quotes ඇතුලේ)

    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY") {
        alert("Please set your valid Gemini API Key in js/utils/ai-generator.js");
        return null;
    }

    const prompt = `Write a creative, short, and selling product description (max 3 sentences) for a product named: "${productName}". Use a friendly tone suitable for a Sri Lankan marketplace. No formatting, just plain text.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error Details:", errorData);
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text.trim();
        } else {
            throw new Error("No text generated");
        }

    } catch (error) {
        console.error("AI Generator Error:", error);
        alert("AI Error: " + error.message);
        return null;
    }
}