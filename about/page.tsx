import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | VISO Collective',
  description: 'Learn about the VISO Collective - a community of photographers dedicated to connection, growth, and creative excellence.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About VISO Collective</h1>
        <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
          A community of photographers dedicated to connection, growth, and creative excellence.
        </p>
      </div>
      
      {/* Mission section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative h-96 bg-zinc-100 rounded-lg overflow-hidden">
          <Image
            src="/images/about-mission.jpg"
            alt="Photographers collaborating"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-zinc-600 mb-4">
            VISO Collective was founded in 2023 with a simple but powerful mission: to create a space where photographers of all skill levels can connect, share knowledge, and grow together.
          </p>
          <p className="text-lg text-zinc-600 mb-4">
            We believe that photography is more than just taking pictures—it's about storytelling, perspective, and creating meaningful connections through visual art.
          </p>
          <p className="text-lg text-zinc-600">
            Through our events, workshops, and online community, we aim to foster a supportive environment where creativity thrives and photographers can push the boundaries of their craft.
          </p>
        </div>
      </div>
      
      {/* Values section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Community</h3>
            <p className="text-zinc-600">
              We believe in the power of community and collaboration. By sharing our experiences, challenges, and successes, we all grow stronger as artists.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Innovation</h3>
            <p className="text-zinc-600">
              We embrace new techniques, technologies, and perspectives. Photography is an evolving art form, and we're committed to staying at the cutting edge.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Inclusivity</h3>
            <p className="text-zinc-600">
              We welcome photographers of all backgrounds, skill levels, and specialties. Diversity in perspective enriches our collective creative vision.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Team member 1 */}
          <div className="text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 relative">
              <Image
                src="/images/team-1.jpg"
                alt="Sarah Chen"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Sarah Chen</h3>
            <p className="text-zinc-600 mb-2">Founder & Creative Director</p>
            <p className="text-sm text-zinc-500">
              Portrait and documentary photographer with over 15 years of experience.
            </p>
          </div>
          
          {/* Team member 2 */}
          <div className="text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 relative">
              <Image
                src="/images/team-2.jpg"
                alt="Marcus Johnson"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Marcus Johnson</h3>
            <p className="text-zinc-600 mb-2">Community Manager</p>
            <p className="text-sm text-zinc-500">
              Landscape photographer and educator passionate about building creative communities.
            </p>
          </div>
          
          {/* Team member 3 */}
          <div className="text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 relative">
              <Image
                src="/images/team-3.jpg"
                alt="Leila Patel"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Leila Patel</h3>
            <p className="text-zinc-600 mb-2">Events Coordinator</p>
            <p className="text-sm text-zinc-500">
              Commercial photographer specializing in fashion and product photography.
            </p>
          </div>
        </div>
      </div>
      
      {/* Join section */}
      <div className="bg-blue-50 rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
          Whether you're just starting out or you're a seasoned professional, there's a place for you in the VISO Collective. Join us for events, share your work, and connect with fellow photographers.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/members"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Meet Our Members
          </Link>
          <Link
            href="/events"
            className="px-6 py-3 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors"
          >
            View Upcoming Events
          </Link>
        </div>
      </div>
    </div>
  );
}
