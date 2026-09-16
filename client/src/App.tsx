import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [, setLocation] = useLocation();
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    setThemeReady(true);
    if (window.location.pathname !== "/") setLocation("/");
  }, [setLocation]);

  if (!themeReady) return null;
  return <Router />;
}
