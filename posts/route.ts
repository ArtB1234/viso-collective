import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { TABLES } from '@/lib/airtable/client';
import { createRecord, updateRecord, deleteRecord, getUserRecords } from '@/lib/airtable/utils';
import { getPostById, getPosts } from '@/lib/airtable/posts';

// GET handler for fetching posts
export async function GET(request: NextRequest) {
  try {
    // Check if requesting a specific post by ID
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const userOnly = url.searchParams.get('userOnly') === 'true';
    
    if (id) {
      // Get a specific post by ID
      const post = await getPostById(id);
      
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      
      return NextResponse.json({ post });
    }
    
    // Get all posts or user's posts
    if (userOnly) {
      const session = await getServerSession(authOptions);
      
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
      
      const posts = await getUserRecords(TABLES.POSTS, session);
      return NextResponse.json({ posts });
    } else {
      // Get all posts
      const posts = await getPosts();
      return NextResponse.json({ posts });
    }
  } catch (error: any) {
    console.error('Error in GET /api/airtable/posts:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST handler for creating a new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }
    
    // Create the post
    const record = await createRecord(TABLES.POSTS, {
      Title: body.title,
      Content: body.content,
      Category: body.category,
      Tags: body.tags || [],
      Image: body.image || [],
      PublishedDate: new Date().toISOString(),
    }, session);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post created successfully',
      post: {
        id: record.id,
        ...record.fields
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/airtable/posts:', error);
    return NextResponse.json({ error: error.message || 'Failed to create post' }, { status: 500 });
  }
}

// PATCH handler for updating a post
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Prepare fields to update
    const fields: Record<string, any> = {};
    
    if (body.title) fields.Title = body.title;
    if (body.content) fields.Content = body.content;
    if (body.category) fields.Category = body.category;
    if (body.tags) fields.Tags = body.tags;
    if (body.image) fields.Image = body.image;
    
    // Update the post
    const record = await updateRecord(TABLES.POSTS, body.id, fields, session);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post updated successfully',
      post: {
        id: record.id,
        ...record.fields
      }
    });
  } catch (error: any) {
    console.error('Error in PATCH /api/airtable/posts:', error);
    
    // Handle permission denied error
    if (error.message === 'Permission denied') {
      return NextResponse.json({ error: 'You do not have permission to update this post' }, { status: 403 });
    }
    
    return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 });
  }
}

// DELETE handler for deleting a post
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Delete the post
    await deleteRecord(TABLES.POSTS, id, session);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error in DELETE /api/airtable/posts:', error);
    
    // Handle permission denied error
    if (error.message === 'Permission denied') {
      return NextResponse.json({ error: 'You do not have permission to delete this post' }, { status: 403 });
    }
    
    return NextResponse.json({ error: error.message || 'Failed to delete post' }, { status: 500 });
  }
}
