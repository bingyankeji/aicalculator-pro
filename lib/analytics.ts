// Google Analytics 4 配置
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-TM7N7SS3H6';

// 扩展Window类型以包含gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// 页面浏览跟踪
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// 事件跟踪
export const event = (action: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, parameters);
  }
};

// 计算器使用事件
export const trackCalculatorUse = (calculatorName: string, calculationType?: string) => {
  event('calculator_use', {
    calculator_name: calculatorName,
    calculator_type: calculationType,
    event_category: 'engagement',
  });
};

// 分享事件
export const trackShare = (calculatorName: string, shareMethod: string) => {
  event('share', {
    content_type: 'calculator',
    content_id: calculatorName,
    method: shareMethod,
  });
};

// 搜索事件
export const trackSearch = (searchTerm: string) => {
  event('search', {
    search_term: searchTerm,
  });
};

// 错误事件
export const trackError = (errorMessage: string, errorLocation: string) => {
  event('exception', {
    description: errorMessage,
    fatal: false,
    custom_parameter: errorLocation,
  });
};

// 用户参与度事件
export const trackEngagement = (engagementType: string, value?: number) => {
  event('user_engagement', {
    engagement_time_msec: value,
    engagement_type: engagementType,
  });
};

// 转化事件
export const trackConversion = (conversionName: string, value?: number) => {
  event(conversionName, {
    currency: 'USD',
    value: value || 1,
  });
};
