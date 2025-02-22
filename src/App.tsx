import 'dayjs/locale/ko';
import openDatabase from './utils/db/openDatabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';

openDatabase();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
