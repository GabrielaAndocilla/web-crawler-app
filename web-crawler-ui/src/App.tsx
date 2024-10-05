import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostListPage from './pages/PostsListPage';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PostListPage />
    </QueryClientProvider>
  );
}

export default App;
