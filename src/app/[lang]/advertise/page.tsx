import AdvertisePageClient from './AdvertisePageClient';

function getSearchValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return value || '';
}

export default async function AdvertisePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <AdvertisePageClient
      source={getSearchValue(params?.source)}
      category={getSearchValue(params?.category)}
    />
  );
}
