const API_URLS = {
  BASE_URL: 'http://staging-plzgraduation-env.eba-s4bbj5cp.ap-northeast-2.elasticbeanstalk.com/api/v1',
  PARSE_API_URL: 'https://ig81au5s0j.execute-api.ap-northeast-2.amazonaws.com/mju-graduate/parse',
};

const MOCK_API_URLS = {
  BASE_URL: 'http://localhost:9090',
  PARSE_API_URL: 'http://localhost:9090/parsePDFtoText',
};

export function setupURL() {
  const isServerMockingEnabled = process.env.API_MOCKING === 'enable';
  const isClientMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'enable';

  if (isMockServer()) {
    return MOCK_API_URLS;
  }

  if (isClient()) {
    if (isClientMoockingEnabled) {
      return MOCK_API_URLS;
    } else {
      return API_URLS;
    }
  }

  // next server
  if (isServerMoockingEnabled && isClientMoockingEnabled) {
    return MOCK_API_URLS;
  } else if (!isServerMoockingEnabled && !isClientMoockingEnabled) {
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
