import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: google62ce07a5a56199e5.html', {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
