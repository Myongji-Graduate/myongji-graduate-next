const API_URLS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_PATH,
  PARSE_API_URL: process.env.NEXT_PUBLIC_PARSE_API_PATH
};

const MOCK_API_URLS = {
  BASE_URL: 'http://localhost:9090',
  PARSE_API_URL: 'http://localhost:9090/parsePDFtoText',
};

export function setupURL() {
  if (process.env.STORY_BOOK === 'true') {
    return MOCK_API_URLS;
  }

  const isServerMockingEnabled = process.env.API_MOCKING === 'enable';
  const isClientMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'enable';

  if (isMockServer()) {
    return MOCK_API_URLS;
  }

  if (isClient()) {
    if (isClientMockingEnabled) {
      return MOCK_API_URLS;
    } else {
      return API_URLS;
    }
  }

  // next server
  if (isServerMockingEnabled && isClientMockingEnabled) {
    return MOCK_API_URLS;
  } else if (!isServerMockingEnabled && !isClientMockingEnabled) {
    return API_URLS;
  } else {
    throw new Error('API_MOCKING env is not set correctly');
  }

  function isMockServer() {
    return process.env.MOCK_SERVER === 'true';
  }

  function isClient() {
    return typeof window !== 'undefined';
  }
}
