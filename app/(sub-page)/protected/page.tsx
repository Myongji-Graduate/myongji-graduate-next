import { API_PATH } from '@/app/business/api-path';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';

async function trigger() {
  const response = await fetch(`${API_PATH.auth}/failure`);
  const result = await response.json();
  httpErrorHandler(response, result);
}

export default async function ProtectedPage() {
  const data = await trigger();
  return <div>Auth protected</div>;
}
