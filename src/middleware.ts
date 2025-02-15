import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(req: Request) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.redirect('/');
  }

  return NextResponse.next();
}