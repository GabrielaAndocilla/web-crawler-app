import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import PostList from './pages/PostsList';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );
}

export default App;
