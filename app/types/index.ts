import { Language } from '@/i18n/settings';

export interface MetaParams {
  params: {
    lng: string;
  };
}

export interface MetadataParams {
  lng: Language;
  namespace?: string;
}

export interface PageProps {
  params: {
    lng: string
  };
}

export interface DashboardProps{
  params: {
    lng: string
  };
};