import { NextRequest, NextResponse } from 'next/server';
import { getMembers, getMemberById } from '@/lib/airtable/members';

// GET /api/airtable/members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const member = await getMemberById(id);
      
      if (!member) {
        return NextResponse.json(
          { error: `Member with ID ${id} not found` },
          { status: 404 }
        );
      }
      
      return NextResponse.json(member);
    }
    
    const members = await getMembers();
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error in members API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}
