import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import PostListPage from './pages/PostsListPage';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <body>
        <main>
          <PostListPage />
        </main>
      </body>
    </QueryClientProvider>
  );
}

export default App;
