import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Alert, AlertTitle, AlertDescription } from '../../atom/alert';

interface AlertDestructiveProps {
  title?: string;
  description: string;
}

export default function AlertDestructive({ title, description }: AlertDestructiveProps) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
