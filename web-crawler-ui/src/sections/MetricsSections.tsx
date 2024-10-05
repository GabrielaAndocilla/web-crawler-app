import { DefinitionListItem } from '../components/atoms/DefinitionListIem';
import ListElement from '../components/molecules/ListElement';
import { useInteractionMetrics } from '../hooks/useInteractionsMetrics';
import {
  FilterTypeMetrics,
  InteractionMetric,
  LimitWordMetrics,
  PageMetrics,
} from '../models/InteractionMetrics';

export const MetricsSections = () => {
  const { data: metricsData } = useInteractionMetrics();
  const metrics: InteractionMetric = metricsData?.data;
  return (
    <section className="border border-gray-100 w-2/3">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Application Metrics
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          This section shows the metrics of the filters, how the user has been
          interacting with post data
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <DefinitionListItem title="Metrics By Page">
              {metrics?.pageMetrics.map(
                ({ page_number, quantity }: PageMetrics) => (
                  <ListElement
                    data-testid={`page_metric_${page_number}`}
                    key={`page_metric_${page_number}`}
                    subtitle={`# of times that Page ${page_number} has been visited : ${quantity}`}
                  />
                )
              )}
            </DefinitionListItem>
            <DefinitionListItem title="Metrics of Title Words">
              {metrics?.limitWordMetrics.map(
                ({ title_words_limit, quantity }: LimitWordMetrics) => (
                  <ListElement
                    data-testid={`title_metric_${title_words_limit}`}
                    key={`title_metric_${title_words_limit}`}
                    subtitle={`# of times filter by ${title_words_limit} words in title has been used: ${quantity}`}
                  />
                )
              )}
            </DefinitionListItem>
            <DefinitionListItem title="Metrics of Filter Type (more than - less than)">
              {metrics?.typeMetrics.map(
                ({ filter_type, quantity }: FilterTypeMetrics) => (
                  <ListElement
                  data-testid={`filter_metric_${filter_type}`}
                    key={`filter_metric_${filter_type}`}
                    subtitle={`# of times filter type ${filter_type} has been used: ${quantity}`}
                  />
                )
              )}
            </DefinitionListItem>
          </div>
        </dl>
      </div>
    </section>
  );
};
