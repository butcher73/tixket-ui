import { useAuth } from '@/hooks/useAuth';

export default function Jarvis() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Welcome to Jarvis</h1>
      {/* Admin-specific content */}
    </div>
  );
}