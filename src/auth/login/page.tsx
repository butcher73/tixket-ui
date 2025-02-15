import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/lib/supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']} // Add providers if needed
        />
      </div>
    </div>
  );
}