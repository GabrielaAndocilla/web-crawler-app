import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { ReactNode } from 'react';
import { UserInteraction } from '../../models/UserInteraction';
import { useSaveInteractions } from '../useSaveInteractions';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

const createQueryClient = () => new QueryClient();
const url = process.env.REACT_APP_BACK_URL;
const userInteraction: UserInteraction = {
  pageNumber: '2',
};

describe('useSaveInteraction', () => {
  it('should call axios with the correct arguments and invalidate queries on success', async () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(['metrics'], []);

    mockedAxios.post.mockResolvedValueOnce({
      id: 2,
      pageNumber: '1',
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useSaveInteractions(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(userInteraction);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${url}/interactions`,
      userInteraction
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
  });
});
