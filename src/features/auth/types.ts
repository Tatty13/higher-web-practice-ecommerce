import type { JSX } from 'react';

export type AuthLayoutProps = {
  title: string;
  submitBtnText: string;
  additionalInfoTitle: string;
  redirectLinkTitle: string;
  redirectLinkPath: string;
  isLoading: boolean;
  onSubmit: () => void;
  children: JSX.Element;
};
