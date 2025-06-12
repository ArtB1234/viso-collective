import Airtable from 'airtable';

// Initialize Airtable client
const airtableClient = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || '');

// Table names
export const TABLES = {
  MEMBERS: 'Members',
  POSTS: 'Posts',
  EVENTS: 'Events',
};

export default airtableClient;
