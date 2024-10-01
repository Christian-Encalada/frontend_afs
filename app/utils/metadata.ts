/* eslint-disable react-hooks/rules-of-hooks */
import { languages, fallbackLng, Language } from '@/i18n/settings';
import { FlatNamespace } from 'i18next';
import { useTranslation } from '@/i18n';
import { MetadataParams } from '@/types/';

export async function generatePageMetadata({
  lng,
  namespace = 'index',
}: MetadataParams) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng as Language;
  const { t } = await useTranslation(lng, namespace as FlatNamespace);
  return {
    title: t('title'),
    content: t('description'),
  };
}
