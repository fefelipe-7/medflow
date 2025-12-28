import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AppEvent, EventType } from '../types';

type EventHandler = (payload: any) => void;

interface EventBusContextType {
  publish: (type: EventType, payload: any) => void;
  subscribe: (type: EventType, handler: EventHandler) => () => void;
  lastEvent: AppEvent | null;
}

const EventBusContext = createContext<EventBusContextType | undefined>(undefined);

export const EventBusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastEvent, setLastEvent] = useState<AppEvent | null>(null);
  // Using a ref for handlers to avoid dependency loops, but simplified for this demo
  const [handlers, setHandlers] = useState<Record<string, EventHandler[]>>({});

  const publish = useCallback((type: EventType, payload: any) => {
    const event: AppEvent = { type, payload, timestamp: Date.now() };
    console.log(`[EventBus] ${type}`, payload);
    setLastEvent(event);
    
    if (handlers[type]) {
      handlers[type].forEach(handler => handler(payload));
    }
  }, [handlers]);

  const subscribe = useCallback((type: EventType, handler: EventHandler) => {
    setHandlers(prev => {
      const currentHandlers = prev[type] || [];
      return { ...prev, [type]: [...currentHandlers, handler] };
    });

    // Return unsubscribe function
    return () => {
      setHandlers(prev => {
        const currentHandlers = prev[type] || [];
        return { ...prev, [type]: currentHandlers.filter(h => h !== handler) };
      });
    };
  }, []);

  return (
    <EventBusContext.Provider value={{ publish, subscribe, lastEvent }}>
      {children}
    </EventBusContext.Provider>
  );
};

export const useEventBus = () => {
  const context = useContext(EventBusContext);
  if (!context) {
    throw new Error('useEventBus must be used within an EventBusProvider');
  }
  return context;
};