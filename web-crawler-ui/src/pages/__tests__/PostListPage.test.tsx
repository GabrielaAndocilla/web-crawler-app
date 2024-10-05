import { render } from '@testing-library/react';
import { posts } from '../../__mocks__/posts';
import * as usePostHook from '../../hooks/usePosts';

import userEvent from '@testing-library/user-event';
import { metrics } from '../../__mocks__/metrics';
import { useInteractionMetrics } from '../../hooks/useInteractionsMetrics';
import { useSaveInteractions } from '../../hooks/useSaveInteractions';
import PostListPage from '../PostsListPage';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.mock('../../hooks/usePosts', () => ({
  usePost: jest.fn(),
}));

jest.mock('../../hooks/useSaveInteractions', () => ({
  useSaveInteractions: jest.fn(),
}));

jest.mock('../../hooks/useInteractionsMetrics', () => ({
  useInteractionMetrics: jest.fn(),
}));

describe('Post List Page', () => {
  let usePostSpy: jest.SpyInstance;

  beforeEach(() => {
    usePostSpy = jest.spyOn(usePostHook, 'usePost');
    (useSaveInteractions as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (useInteractionMetrics as jest.Mock).mockReturnValue({
      data: { data: metrics },
      isFetching: false,
    });
  });

  afterEach(() => {
    usePostSpy.mockRestore();
  });

  it('should render post in page', () => {
    usePostSpy.mockReturnValue({
      data: { data: posts },
      isFetching: false,
    });
    const { getByText, getByTestId, getAllByTestId, getByRole } = render(
      <PostListPage />
    );
    //test Metics section
    expect(getByText('Application Metrics')).toBeDefined();
    expect(getByTestId('page_metric_2')).toBeDefined();
    expect(getByTestId('title_metric_5')).toBeDefined();
    expect(getByTestId('filter_metric_lessThan')).toBeDefined();

    //test Posts
    expect(getAllByTestId(/post_element_/).length).toBe(2);

    userEvent.click(getByRole('button', { name: 'Next Page' }));

    expect(usePostSpy).toHaveBeenCalledWith(2, {});
  });
});
