# Kenya Startup Navigator - Frontend

**Live Application:** [https://kenya-startup-navigator-frontend-ruddy.vercel.app/](https://kenya-startup-navigator-frontend-ruddy.vercel.app/)

## Overview

The Kenya Startup Navigator Frontend is a modern, responsive web application that provides an intuitive interface for entrepreneurs to access AI-powered guidance on Kenya's startup ecosystem. Built with Next.js and TypeScript, it features a beautiful UI with smooth animations and mobile-first design.

## Features

- **Interactive AI Chat**: Real-time Q&A interface with Kenya startup ecosystem expertise
- **Mobile Responsive**: Optimized for all device sizes (mobile, tablet, desktop)
- **Beautiful Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Kenya-Themed Design**: Visual elements inspired by Kenya's flag and African aesthetics
- **Smart Suggestions**: Pre-loaded common startup questions for quick access
- **Confidence Scoring**: Visual indicators showing AI response confidence levels
- **Follow-up Questions**: Contextual suggestions for deeper exploration
- **Source Attribution**: Clear references for AI-generated responses
- **Touch-Friendly**: Optimized for mobile touch interactions

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Backend**: FastAPI (Kenya Startup Navigator API)

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/kenya-startup-navigator-frontend.git
cd kenya-startup-navigator-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup (Optional)

Create a `.env.local` file in the project root if you want to override the default API URL:

```bash
NEXT_PUBLIC_API_URL=https://startup-navigator-backend-new.onrender.com
```

Note: The application will automatically use the production backend URL if no environment variable is set.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
frontend/
├── app/                    # Next.js 13+ app directory
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   └── QueryInterface.tsx # Main chat interface component
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── README.md            # Project documentation
```

## Key Components

### QueryInterface Component

The main chat interface component featuring:

- **Message Management**: State management for user and AI messages
- **Real-time Communication**: Async API calls to backend
- **Responsive Design**: Mobile-first responsive layout
- **Animation Integration**: Smooth entry/exit animations
- **Error Handling**: Graceful error states and retry mechanisms

### Responsive Design Breakpoints

- **Mobile**: < 640px (sm breakpoint)
- **Tablet**: 640px - 1024px (sm to lg)
- **Desktop**: > 1024px (lg and above)

## API Integration

The frontend communicates with the Kenya Startup Navigator backend API:

### Endpoint
```
POST /api/v1/query
```

### Request Format
```typescript
{
  question: string;
  context?: string;
  startup_profile?: object;
}
```

### Response Format
```typescript
{
  answer: string;
  confidence: number;
  processing_time: number;
  sources: string[];
  suggested_follow_ups: string[];
  timestamp: string;
}
```

## Deployment

### Vercel Deployment (Current)

The application is deployed on Vercel with automatic deployments from GitHub:

1. Connect your GitHub repository to Vercel
2. Select the repository and configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
3. Set environment variables (if needed):
   - `NEXT_PUBLIC_API_URL`: Backend API URL
4. Deploy


#### Static Export

```bash
npm run build
npm run export
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://startup-navigator-backend-new.onrender.com` |



## Features in Detail

### Interactive Suggestions

Pre-loaded questions help users get started:

- "How do I raise seed funding for my fintech startup in Kenya?"
- "Which accelerators should I apply to in Nairobi?"
- "How do I register my business in Kenya?"
- "What VCs invest in agritech startups?"
- "What are the legal requirements for fintech in Kenya?"

### Message Types

The interface handles different message types:

- **User Messages**: Blue gradient bubbles aligned right
- **AI Messages**: White bubbles with Kenya flag indicator, aligned left
- **Loading States**: Animated dots with processing message
- **Error Messages**: Fallback messages for API errors

### Visual Elements

- **Kenya Flag Colors**: Black, red, and green design elements
- **Africa Map Background**: Subtle SVG illustration
- **Confidence Bars**: Animated progress bars showing AI confidence
- **Source Tags**: Chips displaying information sources
- **Follow-up Buttons**: Interactive suggestions for continued conversation

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Contributing

### Development Guidelines

1. **TypeScript**: Use strict type checking
2. **Components**: Create reusable, well-documented components
3. **Styling**: Use Tailwind CSS utility classes
4. **Responsive**: Mobile-first responsive design


### Code Style

- **ESLint**: Follow the configured linting rules
- **Prettier**: Use consistent code formatting
- **TypeScript**: Explicit type definitions
- **Components**: Functional components with hooks


## Testing

### Manual Testing Checklist

- [ ] Responsive design on different screen sizes
- [ ] AI chat functionality with sample questions
- [ ] Error handling for network issues
- [ ] Animation performance on various devices
- [ ] Accessibility with keyboard navigation
- [ ] Cross-browser compatibility


## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Check the live application for latest features
- Review browser console for error messages
- Ensure you have a stable internet connection
- Verify the backend API is accessible
