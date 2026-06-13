import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are Niloy Kumar Barman's AI assistant. Answer questions about his projects, skills, and experience. User asks: ${message}` }] }]
        })
      }
    );
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that.';
    
    return NextResponse.json({ message: text });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request.' }, { status: 500 });
  }
}
