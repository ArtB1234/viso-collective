import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/airtable/posts';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPostById(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found | VISO Collective',
    };
  }
  
  return {
    title: `${post.title} | VISO Collective`,
    description: post.content.substring(0, 160) || `View this post on VISO Collective`,
  };
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        href="/posts" 
        className="text-zinc-500 hover:text-zinc-800 flex items-center gap-1 mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Posts
      </Link>
      
      <article className="bg-white border rounded-lg overflow-hidden shadow-md">
        {post.images && post.images.length > 0 && (
          <div className="w-full h-80 bg-zinc-200 relative">
            <Image
              src={post.images[0]}
              alt={post.title || 'Post image'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <div className="p-8">
          <div className="mb-6">
            <span className="inline-block bg-zinc-100 text-zinc-800 text-xs px-2 py-1 rounded mb-3">
              {post.category}
            </span>
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center text-sm text-zinc-500">
              <span>{post.authorName || 'Anonymous'}</span>
              <span className="mx-2">•</span>
              <span>{post.createdAt ? formatDate(post.createdAt) : 'Unknown date'}</span>
            </div>
          </div>
          
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h2 className="text-sm font-semibold text-zinc-500 mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-zinc-100 text-zinc-800 text-xs px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Related posts would go here in a future implementation */}
        </div>
      </article>
    </div>
  );
}
