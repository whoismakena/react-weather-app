import "./styles/App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import WeatherApp from "./views/WeatherApp";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <WeatherApp />
      </div>
    </QueryClientProvider>
  );
}
