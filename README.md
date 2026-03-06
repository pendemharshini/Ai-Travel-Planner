# Travel Planner

A modern travel planning application that helps you create detailed itineraries, estimate costs, and discover new destinations.

## Features

- **Smart Itineraries**: Generate day-by-day plans with activities and transport recommendations.
- **Cost Estimation**: Get a detailed breakdown of your trip expenses in INR.
- **Visual Inspiration**: View AI-generated images of your destinations.
- **Interactive Maps**: Direct links to Google Maps for all recommended locations.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- An API Key for the AI services

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the App

To start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This app is optimized for deployment on Vercel.

1. Push your code to a Git provider.
2. Import the project into Vercel.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel dashboard.
4. Deploy!

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Google AI SDK
