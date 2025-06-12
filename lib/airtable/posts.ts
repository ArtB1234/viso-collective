import airtableClient, { TABLES } from './client';
import { Attachment } from 'airtable';

export type PostCategory = 'Post' | 'Thought' | 'Image' | 'Question' | 'Other';

export interface Post {
  id: string;
  title: string;
  content: string;
  category: PostCategory;
  authorId?: string;
  authorName?: string;
  images?: string[];
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
}

export async function getPosts(): Promise<Post[]> {
  try {
    const records = await airtableClient(TABLES.POSTS).select({
      sort: [{ field: 'CreatedAt', direction: 'desc' }]
    }).all();
    
    return records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        title: fields.Title as string,
        content: fields.Content as string,
        category: fields.Category as PostCategory,
        authorId: fields.AuthorId as string | undefined,
        authorName: fields.AuthorName as string | undefined,
        images: Array.isArray(fields.Images) 
          ? fields.Images.map((image: any) => (image as Attachment).url)
          : undefined,
        createdAt: fields.CreatedAt as string,
        updatedAt: fields.UpdatedAt as string | undefined,
        tags: fields.Tags as string[] | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching posts from Airtable:', error);
    return [];
  }
}

export async function getPostsByCategory(category: PostCategory): Promise<Post[]> {
  try {
    const records = await airtableClient(TABLES.POSTS).select({
      filterByFormula: `{Category} = '${category}'`,
      sort: [{ field: 'CreatedAt', direction: 'desc' }]
    }).all();
    
    return records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        title: fields.Title as string,
        content: fields.Content as string,
        category: fields.Category as PostCategory,
        authorId: fields.AuthorId as string | undefined,
        authorName: fields.AuthorName as string | undefined,
        images: Array.isArray(fields.Images) 
          ? fields.Images.map((image: any) => (image as Attachment).url)
          : undefined,
        createdAt: fields.CreatedAt as string,
        updatedAt: fields.UpdatedAt as string | undefined,
        tags: fields.Tags as string[] | undefined,
      };
    });
  } catch (error) {
    console.error(`Error fetching posts with category ${category} from Airtable:`, error);
    return [];
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const record = await airtableClient(TABLES.POSTS).find(id);
    const fields = record.fields;
    
    return {
      id: record.id,
      title: fields.Title as string,
      content: fields.Content as string,
      category: fields.Category as PostCategory,
      authorId: fields.AuthorId as string | undefined,
      authorName: fields.AuthorName as string | undefined,
      images: Array.isArray(fields.Images) 
        ? fields.Images.map((image: any) => (image as Attachment).url)
        : undefined,
      createdAt: fields.CreatedAt as string,
      updatedAt: fields.UpdatedAt as string | undefined,
      tags: fields.Tags as string[] | undefined,
    };
  } catch (error) {
    console.error(`Error fetching post with ID ${id} from Airtable:`, error);
    return null;
  }
}
