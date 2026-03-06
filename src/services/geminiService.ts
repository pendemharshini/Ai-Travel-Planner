import { GoogleGenAI, Type, Modality } from "@google/genai";

// Initialize AI with the environment variable. 
// The user should set this in the AI Studio Secrets panel.
const getAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface TripPlanRequest {
  destination: string;
  departureCity: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  style: string;
  accommodation: string;
  transport: string;
  food: string;
  activities: string[];
  purpose: string;
}

export interface GroundingLink {
  title: string;
  url: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    location: string;
    description: string;
    estimatedCost: number;
    groundingLinks?: GroundingLink[];
    transportToNext?: {
      mode: string;
      estimatedCost: number;
      description: string;
      duration: string;
    }[];
  }[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
}

export interface CostBreakdown {
  flights: number;
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  visa: number;
  insurance: number;
  misc: number;
  total: number;
}

export interface TripPlanResponse {
  itinerary: ItineraryDay[];
  costs: CostBreakdown;
  recommendations: {
    hotels: { name: string; price: number; rating: number; description: string; mapsUrl?: string }[];
    tips: string[];
  };
}

export const generateTripPlan = async (params: TripPlanRequest): Promise<TripPlanResponse> => {
  const ai = getAI();
  const prompt = `
    Generate a concise yet detailed trip plan for a ${params.purpose} trip to ${params.destination} from ${params.departureCity}.
    Dates: ${params.startDate} to ${params.endDate}.
    Travelers: ${params.travelers}.
    Budget Range: ${params.budget}.
    Travel Style: ${params.style}.
    Accommodation: ${params.accommodation}.
    Transport Preference: ${params.transport}.
    Food Preference: ${params.food}.
    Activities: ${params.activities.join(", ")}.

    Return the response as a JSON object with the following structure:
    {
      "itinerary": [
        {
          "day": 1,
          "title": "Day Theme",
          "activities": [
            {
              "time": "Morning",
              "activity": "Activity Name",
              "location": "Specific Location Name",
              "description": "Brief description",
              "estimatedCost": 500,
              "transportToNext": [
                {
                  "mode": "Taxi",
                  "estimatedCost": 200,
                  "description": "Take a taxi to...",
                  "duration": "20 mins"
                }
              ]
            }
          ],
          "meals": {
            "breakfast": "Recommendation",
            "lunch": "Recommendation",
            "dinner": "Recommendation"
          }
        }
      ],
      "costs": {
        "flights": 10000,
        "accommodation": 5000,
        "food": 3000,
        "transport": 2000,
        "activities": 1500,
        "visa": 0,
        "insurance": 0,
        "misc": 1000,
        "total": 22500
      },
      "recommendations": {
        "hotels": [
          { "name": "Hotel Name", "price": 2000, "rating": 4.5, "description": "Short desc" }
        ],
        "tips": ["Tip 1", "Tip 2"]
      }
    }

    Provide a day-by-day itinerary and a detailed cost breakdown in Indian Rupees (INR).
    For each activity, provide 1-2 specific transport recommendations to the NEXT location.
    Keep descriptions brief (max 2 sentences).
    Ensure all names, places, and recommendations are strictly within India.
    
    IMPORTANT: Use Google Maps to find real locations and provide their names.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a professional travel planner. Generate valid JSON only. Be concise to avoid truncation. Ensure all strings are properly closed.",
      tools: [{ googleMaps: {} }],
      // Note: responseMimeType and responseSchema are NOT allowed with googleMaps tool
    }
  });

  const text = response.text || "{}";
  
  // Extract grounding chunks for Maps links
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const mapsLinks: GroundingLink[] = groundingChunks
    .filter(chunk => chunk.maps)
    .map(chunk => ({
      title: chunk.maps?.title || "View on Google Maps",
      url: chunk.maps?.uri || ""
    }))
    .filter(link => link.url !== "");

  try {
    // Robust JSON extraction: find the first '{' and the last '}'
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found in response");
    }
    
    let jsonString = text.substring(firstBrace, lastBrace + 1);
    
    let parsed: any;
    try {
      parsed = JSON.parse(jsonString);
    } catch (parseError) {
      // Attempt to fix common truncation issues (missing closing braces/brackets)
      console.warn("Initial JSON parse failed, attempting recovery...", parseError);
      
      let recoveredString = jsonString;
      const openBraces = (recoveredString.match(/\{/g) || []).length;
      const closeBraces = (recoveredString.match(/\}/g) || []).length;
      const openBrackets = (recoveredString.match(/\[/g) || []).length;
      const closeBrackets = (recoveredString.match(/\]/g) || []).length;
      
      if (openBrackets > closeBrackets) recoveredString += "]".repeat(openBrackets - closeBrackets);
      if (openBraces > closeBraces) recoveredString += "}".repeat(openBraces - closeBraces);
      
      try {
        parsed = JSON.parse(recoveredString);
      } catch (recoveryError) {
        console.error("JSON recovery failed:", recoveredString);
        throw parseError; // Throw original error
      }
    }

    // Handle common wrapper keys like "trip_plan" or "plan"
    if (parsed.trip_plan) parsed = parsed.trip_plan;
    if (parsed.plan) parsed = parsed.plan;

    // Normalize keys and structure to match TripPlanResponse interface
    const normalized: TripPlanResponse = {
      itinerary: (parsed.itinerary || []).map((day: any, dIdx: number) => ({
        day: day.day || (dIdx + 1),
        title: day.title || day.theme || `Day ${day.day || dIdx + 1}`,
        activities: (day.activities || []).map((act: any) => ({
          time: act.time || "TBD",
          activity: act.activity || act.name || "Activity",
          location: act.location || act.name || "Location",
          description: act.description || "",
          estimatedCost: typeof act.estimatedCost === 'number' ? act.estimatedCost : parseInt(String(act.estimatedCost || "0").replace(/[^0-9]/g, '')) || 0,
          transportToNext: Array.isArray(act.transportToNext) 
            ? act.transportToNext 
            : (act.transport_to_next ? [{ mode: "Transport", estimatedCost: 0, description: act.transport_to_next, duration: "TBD" }] : [])
        })),
        meals: day.meals || {
          breakfast: day.breakfast || "Local breakfast",
          lunch: day.lunch || "Local lunch",
          dinner: day.dinner || "Local dinner"
        }
      })),
      costs: {
        flights: typeof parsed.costs?.flights === 'number' ? parsed.costs.flights : parseInt(String(parsed.costs?.flights || parsed.cost_breakdown_inr?.flights_round_trip_hyderabad_delhi_3_pax || "0").replace(/[^0-9]/g, '')) || 0,
        accommodation: typeof parsed.costs?.accommodation === 'number' ? parsed.costs.accommodation : parseInt(String(parsed.costs?.accommodation || parsed.cost_breakdown_inr?.accommodation_7_nights_hotel || "0").replace(/[^0-9]/g, '')) || 0,
        food: typeof parsed.costs?.food === 'number' ? parsed.costs.food : parseInt(String(parsed.costs?.food || parsed.cost_breakdown_inr?.food_7_days_local_cuisine || "0").replace(/[^0-9]/g, '')) || 0,
        transport: typeof parsed.costs?.transport === 'number' ? parsed.costs.transport : parseInt(String(parsed.costs?.transport || parsed.cost_breakdown_inr?.local_transport_metro_auto_taxi_7_days || "0").replace(/[^0-9]/g, '')) || 0,
        activities: typeof parsed.costs?.activities === 'number' ? parsed.costs.activities : parseInt(String(parsed.costs?.activities || parsed.cost_breakdown_inr?.activities_entry_fees || "0").replace(/[^0-9]/g, '')) || 0,
        visa: typeof parsed.costs?.visa === 'number' ? parsed.costs.visa : 0,
        insurance: typeof parsed.costs?.insurance === 'number' ? parsed.costs.insurance : 0,
        misc: typeof parsed.costs?.misc === 'number' ? parsed.costs.misc : parseInt(String(parsed.costs?.misc || parsed.cost_breakdown_inr?.miscellaneous_buffer || "0").replace(/[^0-9]/g, '')) || 0,
        total: typeof parsed.costs?.total === 'number' ? parsed.costs.total : parseInt(String(parsed.costs?.total || parsed.cost_breakdown_inr?.total_estimated_cost || "0").replace(/[^0-9]/g, '')) || 0
      },
      recommendations: {
        hotels: (parsed.recommendations?.hotels || parsed.hotels || []).map((h: any) => ({
          name: h.name || "Recommended Hotel",
          price: typeof h.price === 'number' ? h.price : parseInt(String(h.price || "0").replace(/[^0-9]/g, '')) || 0,
          rating: typeof h.rating === 'number' ? h.rating : parseFloat(String(h.rating || "4.0")),
          description: h.description || "A comfortable stay option.",
          mapsUrl: h.mapsUrl
        })),
        tips: parsed.recommendations?.tips || parsed.tips || ["Pack light", "Carry local currency", "Respect local customs"]
      }
    };

    // Enrich the parsed data with grounding links if possible
    if (mapsLinks.length > 0) {
      // Enrich activities
      normalized.itinerary.forEach(day => {
        day.activities.forEach(activity => {
          const matchingLinks = mapsLinks.filter(link => 
            link.title.toLowerCase().includes(activity.location.toLowerCase()) ||
            activity.location.toLowerCase().includes(link.title.toLowerCase())
          );
          if (matchingLinks.length > 0) {
            activity.groundingLinks = matchingLinks;
          }
        });
      });

      // Enrich hotels
      normalized.recommendations.hotels.forEach(hotel => {
        const matchingLink = mapsLinks.find(link => 
          link.title.toLowerCase().includes(hotel.name.toLowerCase()) ||
          hotel.name.toLowerCase().includes(link.title.toLowerCase())
        );
        if (matchingLink) {
          hotel.mapsUrl = matchingLink.url;
        }
      });
    }

    return normalized;
  } catch (error) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("The AI generated an invalid response. Please try again with a shorter duration or fewer activities.");
  }
};

/**
 * Generates an AI image for a travel destination or activity
 */
export const generateTravelImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A beautiful, high-quality travel photograph of ${prompt}. Professional photography, vibrant colors, cinematic lighting.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};
