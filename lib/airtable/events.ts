import airtableClient, { TABLES } from './client';
import { Attachment } from 'airtable';

export type EventType = 'Workshop' | 'Meetup' | 'Exhibition' | 'Conference' | 'Other';

export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  organizer?: string;
  organizerId?: string;
  image?: string;
  rsvpLink?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  tags?: string[];
}

export async function getEvents(): Promise<Event[]> {
  try {
    const records = await airtableClient(TABLES.EVENTS).select({
      sort: [{ field: 'Date', direction: 'asc' }],
      filterByFormula: `{Date} >= TODAY()`
    }).all();
    
    return records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        title: fields.Title as string,
        description: fields.Description as string,
        eventType: fields.EventType as EventType,
        date: fields.Date as string,
        startTime: fields.StartTime as string | undefined,
        endTime: fields.EndTime as string | undefined,
        location: fields.Location as string | undefined,
        organizer: fields.Organizer as string | undefined,
        organizerId: fields.OrganizerId as string | undefined,
        image: Array.isArray(fields.Image) && fields.Image.length > 0
          ? (fields.Image[0] as Attachment).url
          : undefined,
        rsvpLink: fields.RSVPLink as string | undefined,
        maxAttendees: fields.MaxAttendees as number | undefined,
        currentAttendees: fields.CurrentAttendees as number | undefined,
        tags: fields.Tags as string[] | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching events from Airtable:', error);
    return [];
  }
}

export async function getPastEvents(): Promise<Event[]> {
  try {
    const records = await airtableClient(TABLES.EVENTS).select({
      sort: [{ field: 'Date', direction: 'desc' }],
      filterByFormula: `{Date} < TODAY()`
    }).all();
    
    return records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        title: fields.Title as string,
        description: fields.Description as string,
        eventType: fields.EventType as EventType,
        date: fields.Date as string,
        startTime: fields.StartTime as string | undefined,
        endTime: fields.EndTime as string | undefined,
        location: fields.Location as string | undefined,
        organizer: fields.Organizer as string | undefined,
        organizerId: fields.OrganizerId as string | undefined,
        image: Array.isArray(fields.Image) && fields.Image.length > 0
          ? (fields.Image[0] as Attachment).url
          : undefined,
        rsvpLink: fields.RSVPLink as string | undefined,
        maxAttendees: fields.MaxAttendees as number | undefined,
        currentAttendees: fields.CurrentAttendees as number | undefined,
        tags: fields.Tags as string[] | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching past events from Airtable:', error);
    return [];
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const record = await airtableClient(TABLES.EVENTS).find(id);
    const fields = record.fields;
    
    return {
      id: record.id,
      title: fields.Title as string,
      description: fields.Description as string,
      eventType: fields.EventType as EventType,
      date: fields.Date as string,
      startTime: fields.StartTime as string | undefined,
      endTime: fields.EndTime as string | undefined,
      location: fields.Location as string | undefined,
      organizer: fields.Organizer as string | undefined,
      organizerId: fields.OrganizerId as string | undefined,
      image: Array.isArray(fields.Image) && fields.Image.length > 0
        ? (fields.Image[0] as Attachment).url
        : undefined,
      rsvpLink: fields.RSVPLink as string | undefined,
      maxAttendees: fields.MaxAttendees as number | undefined,
      currentAttendees: fields.CurrentAttendees as number | undefined,
      tags: fields.Tags as string[] | undefined,
    };
  } catch (error) {
    console.error(`Error fetching event with ID ${id} from Airtable:`, error);
    return null;
  }
}
