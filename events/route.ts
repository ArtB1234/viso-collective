import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { TABLES } from '@/lib/airtable/client';
import { createRecord, updateRecord, deleteRecord, getUserRecords } from '@/lib/airtable/utils';
import { getEventById, getEvents } from '@/lib/airtable/events';

// GET handler for fetching events
export async function GET(request: NextRequest) {
  try {
    // Check if requesting a specific event by ID
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const userOnly = url.searchParams.get('userOnly') === 'true';
    
    if (id) {
      // Get a specific event by ID
      const event = await getEventById(id);
      
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
      
      return NextResponse.json({ event });
    }
    
    // Get all events or user's events
    if (userOnly) {
      const session = await getServerSession(authOptions);
      
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
      
      const events = await getUserRecords(TABLES.EVENTS, session);
      return NextResponse.json({ events });
    } else {
      // Get all events
      const events = await getEvents();
      return NextResponse.json({ events });
    }
  } catch (error: any) {
    console.error('Error in GET /api/airtable/events:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch events' }, { status: 500 });
  }
}

// POST handler for creating a new event
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.date || !body.eventType) {
      return NextResponse.json(
        { error: 'Title, date, and event type are required' },
        { status: 400 }
      );
    }
    
    // Create the event
    const record = await createRecord(TABLES.EVENTS, {
      Title: body.title,
      Date: body.date,
      EventType: body.eventType,
      Description: body.description || '',
      StartTime: body.startTime || '',
      EndTime: body.endTime || '',
      Location: body.location || '',
      RSVPLink: body.rsvpLink || '',
      MaxAttendees: body.maxAttendees || null,
      CurrentAttendees: body.currentAttendees || 0,
      Image: body.image || [],
      Tags: body.tags || [],
      Organizer: body.organizer || session.user.name || 'Unknown',
    }, session);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Event created successfully',
      event: {
        id: record.id,
        ...record.fields
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/airtable/events:', error);
    return NextResponse.json({ error: error.message || 'Failed to create event' }, { status: 500 });
  }
}

// PATCH handler for updating an event
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }
    
    // Prepare fields to update
    const fields: Record<string, any> = {};
    
    if (body.title) fields.Title = body.title;
    if (body.date) fields.Date = body.date;
    if (body.eventType) fields.EventType = body.eventType;
    if (body.description !== undefined) fields.Description = body.description;
    if (body.startTime !== undefined) fields.StartTime = body.startTime;
    if (body.endTime !== undefined) fields.EndTime = body.endTime;
    if (body.location !== undefined) fields.Location = body.location;
    if (body.rsvpLink !== undefined) fields.RSVPLink = body.rsvpLink;
    if (body.maxAttendees !== undefined) fields.MaxAttendees = body.maxAttendees;
    if (body.currentAttendees !== undefined) fields.CurrentAttendees = body.currentAttendees;
    if (body.image !== undefined) fields.Image = body.image;
    if (body.tags !== undefined) fields.Tags = body.tags;
    if (body.organizer !== undefined) fields.Organizer = body.organizer;
    
    // Update the event
    const record = await updateRecord(TABLES.EVENTS, body.id, fields, session);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Event updated successfully',
      event: {
        id: record.id,
        ...record.fields
      }
    });
  } catch (error: any) {
    console.error('Error in PATCH /api/airtable/events:', error);
    
    // Handle permission denied error
    if (error.message === 'Permission denied') {
      return NextResponse.json({ error: 'You do not have permission to update this event' }, { status: 403 });
    }
    
    return NextResponse.json({ error: error.message || 'Failed to update event' }, { status: 500 });
  }
}

// DELETE handler for deleting an event
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }
    
    // Delete the event
    await deleteRecord(TABLES.EVENTS, id, session);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Event deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error in DELETE /api/airtable/events:', error);
    
    // Handle permission denied error
    if (error.message === 'Permission denied') {
      return NextResponse.json({ error: 'You do not have permission to delete this event' }, { status: 403 });
    }
    
    return NextResponse.json({ error: error.message || 'Failed to delete event' }, { status: 500 });
  }
}
