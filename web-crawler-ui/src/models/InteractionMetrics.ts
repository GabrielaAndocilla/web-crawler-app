export interface PageMetrics {
  page_number: string;
  quantity: number;
}

export interface LimitWordMetrics {
  title_words_limit: string;
  quantity: number;
}

export interface FilterTypeMetrics {
  filter_type: string;
  quantity: number;
}

export interface InteractionMetric {
  pageMetrics: PageMetrics[];
  limitWordMetrics: LimitWordMetrics[];
  typeMetrics: FilterTypeMetrics[];
}
