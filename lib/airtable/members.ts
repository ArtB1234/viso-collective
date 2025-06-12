import airtableClient, { TABLES } from './client';
import { FieldSet, Attachment } from 'airtable';

export interface Member {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profileImage?: string;
  skills?: string[];
  interests?: string[];
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  joinedDate?: string;
}

export async function getMembers(): Promise<Member[]> {
  try {
    const records = await airtableClient(TABLES.MEMBERS).select().all();
    
    return records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        name: fields.Name as string,
        email: fields.Email as string,
        bio: fields.Bio as string | undefined,
        profileImage: Array.isArray(fields.ProfileImage) && fields.ProfileImage.length > 0
          ? (fields.ProfileImage[0] as Attachment).url
          : undefined,
        skills: fields.Skills as string[] | undefined,
        interests: fields.Interests as string[] | undefined,
        socialLinks: {
          website: fields.Website as string | undefined,
          instagram: fields.Instagram as string | undefined,
          twitter: fields.Twitter as string | undefined,
          linkedin: fields.LinkedIn as string | undefined,
        },
        joinedDate: fields.JoinedDate as string | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching members from Airtable:', error);
    return [];
  }
}

export async function getMemberById(id: string): Promise<Member | null> {
  try {
    const record = await airtableClient(TABLES.MEMBERS).find(id);
    const fields = record.fields;
    
    return {
      id: record.id,
      name: fields.Name as string,
      email: fields.Email as string,
      bio: fields.Bio as string | undefined,
      profileImage: Array.isArray(fields.ProfileImage) && fields.ProfileImage.length > 0
        ? (fields.ProfileImage[0] as Attachment).url
        : undefined,
      skills: fields.Skills as string[] | undefined,
      interests: fields.Interests as string[] | undefined,
      socialLinks: {
        website: fields.Website as string | undefined,
        instagram: fields.Instagram as string | undefined,
        twitter: fields.Twitter as string | undefined,
        linkedin: fields.LinkedIn as string | undefined,
      },
      joinedDate: fields.JoinedDate as string | undefined,
    };
  } catch (error) {
    console.error(`Error fetching member with ID ${id} from Airtable:`, error);
    return null;
  }
}
