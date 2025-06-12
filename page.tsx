import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: 'Your Profile | VISO Collective',
  description: 'View and manage your VISO Collective profile',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }
  
  const { user } = session;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative">
              {user.image ? (
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src={user.image}
                    alt={user.name || "Profile picture"}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-500 text-white text-4xl">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{user.name || "VISO Member"}</h2>
              <p className="text-zinc-600 mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  VISO Member
                </span>
                <span className="bg-zinc-100 text-zinc-800 text-xs px-2 py-1 rounded">
                  Joined 2023
                </span>
              </div>
              
              <p className="text-zinc-600 mb-6">
                Welcome to your VISO Collective profile! This is where you can view and manage your information.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/settings"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/members"
                  className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                >
                  View All Members
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Your Activity</h3>
          <p className="text-zinc-600">
            Your recent activity in the VISO Collective will appear here.
          </p>
          <div className="mt-4 p-4 bg-zinc-50 rounded-lg text-center">
            <p className="text-zinc-500">No recent activity</p>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
          <p className="text-zinc-600">
            Events you've registered for will appear here.
          </p>
          <div className="mt-4 p-4 bg-zinc-50 rounded-lg text-center">
            <p className="text-zinc-500">No upcoming events</p>
            <Link
              href="/events"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Browse events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
