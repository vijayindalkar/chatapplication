# WhatsApp Web Clone

A real-time chat application built with React, Supabase, and IndexedDB, featuring offline capabilities and real-time message synchronization.

## Features

- 💬 Real-time messaging
- 🔄 Offline support with IndexedDB
- 👤 Contact management
- 📱 Responsive design
- 🔍 Contact search
- ✅ Message read receipts
- ⌨️ Multi-line message support

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** TailwindCSS
- **Database:** Supabase
- **Local Storage:** IndexedDB
- **Icons:** Lucide React
- **Date Handling:** date-fns

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # React components
│   ├── chat/         # Chat-related components
│   └── ui/           # Reusable UI components
├── context/          # React Context providers
├── lib/              # Database and utility functions
├── services/         # API and service functions
└── types/           # TypeScript type definitions
```

## Architecture and Design Choices

### State Management
- **React Context:** Used for global state management of contacts and messages
- **useReducer:** Manages complex state transitions and actions
- **Custom Hooks:** Encapsulates common logic for database operations

### Database Design
- **Supabase:** 
  - Real-time message synchronization
  - Contact management
  - Message persistence
- **IndexedDB:**
  - Offline data storage
  - Message caching
  - Contact information storage

### Component Architecture
- **Atomic Design:** Components are organized following atomic design principles
- **Separation of Concerns:** UI components are separated from business logic
- **Reusable Components:** Common UI elements are abstracted into reusable components

## Hooks Usage

### Custom Hooks

1. `useChat` (Context Hook)
   - Manages global chat state
   - Provides message sending functionality
   - Handles contact selection

### Built-in Hooks

1. `useReducer`
   - Manages complex state transitions
   - Handles message and contact updates
   - Provides predictable state updates

2. `useEffect`
   - Handles side effects like data fetching
   - Manages WebSocket connections
   - Syncs with IndexedDB

3. `useRef`
   - Manages textarea resizing
   - Stores previous state values
   - DOM element references

## Challenges and Solutions

1. **Offline Support**
   - Challenge: Maintaining data consistency between online and offline states
   - Solution: Implemented IndexedDB for local storage with sync mechanisms

2. **Real-time Updates**
   - Challenge: Managing real-time updates without overwhelming the client
   - Solution: Used Supabase's real-time subscriptions with optimistic updates

3. **State Management**
   - Challenge: Complex state interactions between messages and contacts
   - Solution: Implemented useReducer with clear action types and state updates

4. **Performance**
   - Challenge: Handling large message histories
   - Solution: Implemented virtualization and pagination for message lists

## Best Practices

1. **Code Organization**
   - Small, focused components
   - Clear separation of concerns
   - Reusable utility functions

2. **Performance**
   - Memoization of expensive calculations
   - Lazy loading of components
   - Efficient re-rendering strategies

3. **Type Safety**
   - Comprehensive TypeScript types
   - Strict type checking
   - Type inference where possible

4. **Error Handling**
   - Graceful error recovery
   - User-friendly error messages
   - Fallback UI components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for learning or building your own chat application.