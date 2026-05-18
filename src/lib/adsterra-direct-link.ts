const DIRECT_LINK_ID = 'adsterra-direct-link';
const DEFAULT_SUB_ID_PARAM = 'psid';

interface DirectLinkInput {
  placement: string;
  category?: string;
  lang?: string;
}

export interface AdsterraDirectLink {
  id: typeof DIRECT_LINK_ID;
  url: string;
  subId: string;
}

function normalizeSubId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80) || 'devtoolbox';
}

function appendSubId(baseUrl: string, paramName: string, subId: string) {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set(paramName, subId);
    return url.toString();
  } catch {
    const [urlWithoutHash, hash] = baseUrl.split('#');
    const separator = urlWithoutHash.includes('?') ? '&' : '?';
    const suffix = `${separator}${encodeURIComponent(paramName)}=${encodeURIComponent(subId)}`;
    return `${urlWithoutHash}${suffix}${hash ? `#${hash}` : ''}`;
  }
}

export function getAdsterraDirectLink({
  placement,
  category,
  lang,
}: DirectLinkInput): AdsterraDirectLink | undefined {
  const baseUrl = process.env.NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL?.trim();
  if (!baseUrl) return undefined;

  const normalizedBaseUrl = baseUrl.startsWith('//') ? `https:${baseUrl}` : baseUrl;
  const paramName = (
    process.env.NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_SUB_ID_PARAM?.trim() ||
    DEFAULT_SUB_ID_PARAM
  );
  const subId = normalizeSubId(['dtb', placement, lang, category].filter(Boolean).join('_'));

  return {
    id: DIRECT_LINK_ID,
    url: appendSubId(normalizedBaseUrl, paramName, subId),
    subId,
  };
}
