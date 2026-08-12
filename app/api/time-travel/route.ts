import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { TimeTravelResponsePayload } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body || {};

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'URL parameter is required.' },
        { status: 400 }
      );
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    // Calculate timestamp for 1 year ago (YYYYMMDD)
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const yyyy = oneYearAgo.getFullYear();
    const mm = String(oneYearAgo.getMonth() + 1).padStart(2, '0');
    const dd = String(oneYearAgo.getDate()).padStart(2, '0');
    const timestampStr = `${yyyy}${mm}${dd}`;

    const waybackApiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(targetUrl)}&timestamp=${timestampStr}`;

    const waybackResponse = await fetch(waybackApiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrivacyLens-TimeTravel/1.0'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!waybackResponse.ok) {
      return NextResponse.json<TimeTravelResponsePayload>({
        success: true,
        available: false,
        error: `Wayback Machine API returned status ${waybackResponse.status}`
      });
    }

    const waybackData = await waybackResponse.json();
    const closestSnapshot = waybackData?.archived_snapshots?.closest;

    if (!closestSnapshot || !closestSnapshot.available || !closestSnapshot.url) {
      return NextResponse.json<TimeTravelResponsePayload>({
        success: true,
        available: false,
        error: `No historical Wayback snapshot found for ${targetUrl} from ~1 year ago (${yyyy}-${mm}-${dd}).`
      });
    }

    const snapshotUrl = closestSnapshot.url;
    const rawTimestamp = closestSnapshot.timestamp; // e.g. "20250812153000"
    const formattedDate = rawTimestamp 
      ? `${rawTimestamp.slice(0, 4)}-${rawTimestamp.slice(4, 6)}-${rawTimestamp.slice(6, 8)}`
      : `${yyyy}-${mm}-${dd}`;

    // Fetch the archived HTML snapshot
    const snapshotFetch = await fetch(snapshotUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrivacyLens-TimeTravel/1.0'
      },
      signal: AbortSignal.timeout(12000)
    });

    if (!snapshotFetch.ok) {
      return NextResponse.json<TimeTravelResponsePayload>({
        success: true,
        available: false,
        snapshotUrl,
        snapshotDate: formattedDate,
        error: `Snapshot URL accessible, but html fetch failed with status ${snapshotFetch.status}`
      });
    }

    const snapshotHtml = await snapshotFetch.text();
    const $ = cheerio.load(snapshotHtml);

    // Remove Wayback header injection and unneeded tags
    $('#wm-ipp-base, #wm-ipp, script, style, nav, header, footer, aside, noscript, iframe, svg').remove();

    let cleanedText = $('article, main, body').text();
    cleanedText = cleanedText
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    return NextResponse.json<TimeTravelResponsePayload>({
      success: true,
      available: true,
      snapshotDate: formattedDate,
      snapshotUrl,
      historicalText: cleanedText.slice(0, 20000)
    });

  } catch (err: any) {
    console.error('API /api/time-travel error:', err);
    return NextResponse.json(
      { 
        success: false, 
        available: false, 
        error: err.message || 'An error occurred while fetching historical Wayback data.' 
      },
      { status: 500 }
    );
  }
}
