"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { CurrentUser, PrivacySettings, ProfileFieldVisibility } from "@/types/user";
import { Connection, ConnectionStatus } from "@/types/connection";
import { getCurrentUser } from "@/data/mockUsers";
import { MOCK_CONNECTIONS } from "@/data/mockConnections";

const STORAGE_KEY = "kyomei_profile";

function loadProfile(): CurrentUser {
  if (typeof window === "undefined") return getCurrentUser();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...getCurrentUser(), ...JSON.parse(saved) };
  } catch {}
  return getCurrentUser();
}

interface AppContextValue {
  currentUser: CurrentUser;
  isAuthenticated: boolean;
  onboardingStep: number;
  connections: Connection[];
  setOnboardingStep: (step: number) => void;
  setAuthenticated: (val: boolean) => void;
  getConnectionStatus: (userId: string) => ConnectionStatus | null;
  setInterested: (userId: string) => void;
  removeConnection: (userId: string) => void;
  startConversation: (userId: string) => void;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;
  updateProfile: (fields: {
    name?: string;
    realName?: string;
    age?: number;
    gender?: string;
    occupation?: string;
    tagline?: string;
    cherished?: string;
    fieldVisibility?: ProfileFieldVisibility;
  }) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(loadProfile);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(3);
  const [connections, setConnections] = useState<Connection[]>(MOCK_CONNECTIONS);

  const setAuthenticated = useCallback((val: boolean) => {
    setIsAuthenticated(val);
  }, []);

  const getConnectionStatus = useCallback(
    (userId: string): ConnectionStatus | null => {
      const conn = connections.find((c) => c.userId === userId);
      return conn?.status ?? null;
    },
    [connections]
  );

  const setInterested = useCallback((userId: string) => {
    setConnections((prev) => {
      const exists = prev.find((c) => c.userId === userId);
      if (exists) return prev;
      return [
        ...prev,
        {
          id: `c_${userId}`,
          userId,
          status: "interested" as ConnectionStatus,
          connectedAt: new Date().toISOString(),
        },
      ];
    });
  }, []);

  const removeConnection = useCallback((userId: string) => {
    setConnections((prev) => prev.filter((c) => c.userId !== userId));
  }, []);

  const startConversation = useCallback((userId: string) => {
    setConnections((prev) => {
      const exists = prev.find((c) => c.userId === userId);
      if (exists) {
        return prev.map((c) =>
          c.userId === userId ? { ...c, status: "talking" as ConnectionStatus } : c
        );
      }
      return [
        ...prev,
        {
          id: `c_${userId}`,
          userId,
          status: "talking" as ConnectionStatus,
          connectedAt: new Date().toISOString(),
        },
      ];
    });
  }, []);

  const updatePrivacySettings = useCallback((settings: Partial<PrivacySettings>) => {
    setCurrentUser((prev) => ({
      ...prev,
      privacySettings: { ...prev.privacySettings, ...settings },
    }));
  }, []);

  const updateProfile = useCallback((fields: Partial<CurrentUser>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...fields };
      try {
        // id・avatarUrl等のモックデータは除いて差分だけ保存
        const { id, avatarUrl, isOnline, lastSeenAt, joinedAt, privacySettings, ...saveable } = next;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saveable));
      } catch {}
      return next;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        onboardingStep,
        connections,
        setOnboardingStep,
        setAuthenticated,
        getConnectionStatus,
        setInterested,
        removeConnection,
        startConversation,
        updatePrivacySettings,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
