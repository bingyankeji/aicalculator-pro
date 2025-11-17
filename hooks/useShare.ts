'use client';

import { useState } from 'react';
import { trackShare } from '@/lib/analytics';

interface UseShareProps {
  calculatorPath: string; // e.g., '/calorie-calculator'
  getShareParams: () => Record<string, string>; // Function to generate URL params
  getShareText: () => string | undefined; // Function to generate share text
}

export function useShare({ calculatorPath, getShareParams, getShareText }: UseShareProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareText, setShareText] = useState('');

  const handleShare = () => {
    if (typeof window === 'undefined') return;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const params = new URLSearchParams(getShareParams());
    const url = `${baseUrl}${calculatorPath}?${params.toString()}`;

    // 跟踪分享事件
    const calculatorName = calculatorPath.replace('/', '').replace('-', ' ');
    trackShare(calculatorName, 'share_button');

    // 确保 getShareText 总是返回字符串
    const shareTextValue = getShareText() || 'Check out this calculation!';

    setShareUrl(url);
    setShareText(shareTextValue);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  return {
    showShareModal,
    shareUrl,
    shareText,
    handleShare,
    closeShareModal,
  };
}

