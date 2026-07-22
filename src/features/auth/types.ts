import type { PropsWithChildren } from 'react';

export type AuthLayoutProps = PropsWithChildren<{
  title: string;
  submitBtnText: string;
  additionalInfoTitle: string;
  redirectLinkTitle: string;
  redirectLinkPath: string;
  isLoading: boolean;
  onSubmit: () => void;
}>;
