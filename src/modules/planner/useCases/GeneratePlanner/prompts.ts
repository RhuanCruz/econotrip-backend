import { GeneratePlannerType } from './GeneratePlannerSchema';

export const getItneraryPrompt = ({ destination, start, end }: GeneratePlannerType): string => `
You are a travel assistant. Generate a detailed, realistic trip itinerary for the following:

Destination: ${destination}
Start Date: ${start}
End Date: ${end}

Before create itinerary, you have to generaty the content in pt-br and ignore checkin, checkout and flights stuff, focus in activities.

Return the itinerary in JSON format with the following structure:
{
  "destination": "string",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "currency": "$" // symbols R$,$ or euro symbol
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "id": 1, //sequetial
          "title": "Visita na Torre Eiffel"
          "time": "08:00",
          "duration": "1h30",
          "description": "É um passeio que acontece no bairro X, você tem opções de tirar fotos Y", // short description about the activity
          "estimatedCost: 30
        },
        ...
      ]
    },
    ...
  ],
  "totalEstimatedCost": number
}
Only return valid JSON with no explanation.
  `.trim();
