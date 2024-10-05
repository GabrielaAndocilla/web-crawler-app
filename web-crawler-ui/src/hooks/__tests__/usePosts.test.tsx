import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { ReactNode } from 'react';
import { posts } from '../../__mocks__/posts';
import { usePost } from '../usePosts';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;
const createQueryClient = () => new QueryClient();
const url = process.env.REACT_APP_BACK_URL;

describe('usePost', () => {
  it('should call axios without arguments and invalidate queries on success', async () => {
    const queryClient = createQueryClient();

    mockedAxios.get.mockResolvedValueOnce({
      data: posts,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => usePost(), { wrapper });

    expect(mockedAxios.get).toHaveBeenCalledWith(`${url}/posts`);

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
  });

  it('should call axios with arguments and invalidate queries on success', async () => {
    const queryClient = createQueryClient();

    mockedAxios.get.mockResolvedValueOnce({
      data: posts,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () => usePost(2, { limit: '4', type: 'moreThan' }),
      { wrapper }
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${url}/posts?page=2&limit=4&type=moreThan`
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
  });
});
