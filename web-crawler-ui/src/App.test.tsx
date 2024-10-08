import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({}));

test('render App', () => {
  const queryClient = new QueryClient();
  const { baseElement } = render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  expect(baseElement).toBeDefined();
});
