import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { ReactNode } from 'react';
import { interactions } from '../../__mocks__/interactions';
import { useInteractionMetrics } from '../useInteractionsMetrics';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;
const createQueryClient = () => new QueryClient();
const url = process.env.REACT_APP_BACK_URL;

describe('useInteractionMetric', () => {
  it('should call metrics with axios and invalidate queries on success', async () => {
    const queryClient = createQueryClient();

    mockedAxios.get.mockResolvedValueOnce({
      data: interactions,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useInteractionMetrics(), { wrapper });

    expect(mockedAxios.get).toHaveBeenCalledWith(`${url}/interactions/metrics`);

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
  });
});
