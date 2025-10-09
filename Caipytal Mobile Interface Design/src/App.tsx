import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { AuthScreen } from "./components/AuthScreen";
import { Dashboard } from "./components/Dashboard";
import { FormulasPage } from "./components/FormulasPage";
import { AIPage } from "./components/AIPage";
import { HistoryPage } from "./components/HistoryPage";
import { ProfilePage } from "./components/ProfilePage";
import { BottomNav } from "./components/BottomNav";

type AppState = "splash" | "auth" | "app";
type Page = "home" | "formulas" | "ai" | "history" | "profile";

export default function App() {
  const [appState, setAppState] = useState<AppState>("splash");
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleSplashComplete = () => {
    setAppState("auth");
  };

  const handleAuth = () => {
    setAppState("app");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  if (appState === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === "auth") {
    return <AuthScreen onAuth={handleAuth} />;
  }

  return (
    <div className="size-full bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Page content */}
      <div className="h-full">
        {currentPage === "home" && <Dashboard onNavigate={handleNavigate} />}
        {currentPage === "formulas" && <FormulasPage />}
        {currentPage === "ai" && <AIPage />}
        {currentPage === "history" && <HistoryPage />}
        {currentPage === "profile" && <ProfilePage />}
      </div>

      {/* Bottom navigation */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}
