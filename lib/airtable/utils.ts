import { Session } from 'next-auth';
import airtableClient, { TABLES } from './client';

/**
 * Check if a user has permission to modify a record
 * @param userId The ID of the current user
 * @param record The Airtable record to check
 * @param creatorField The field name that stores the creator's ID
 * @returns Boolean indicating if the user has permission
 */
export function hasPermission(
  userId: string | undefined,
  record: any,
  creatorField: string = 'CreatorId'
): boolean {
  if (!userId) return false;
  
  // If the record doesn't have a creator field, deny permission
  if (!record.fields[creatorField]) return false;
  
  // Check if the user is the creator of the record
  return record.fields[creatorField] === userId;
}

/**
 * Create a new record in Airtable with the current user as creator
 * @param tableName The name of the table
 * @param fields The fields to create
 * @param session The current user session
 * @returns The created record
 */
export async function createRecord(
  tableName: string,
  fields: Record<string, any>,
  session: Session | null
) {
  if (!session?.user?.id) {
    throw new Error('Authentication required');
  }
  
  // Add the creator ID to the fields
  const fieldsWithCreator = {
    ...fields,
    CreatorId: session.user.id,
    Creator: session.user.name || 'Unknown User',
  };
  
  try {
    const record = await airtableClient(tableName).create(fieldsWithCreator);
    return record;
  } catch (error) {
    console.error(`Error creating record in ${tableName}:`, error);
    throw new Error(`Failed to create record in ${tableName}`);
  }
}

/**
 * Update a record in Airtable if the user has permission
 * @param tableName The name of the table
 * @param recordId The ID of the record to update
 * @param fields The fields to update
 * @param session The current user session
 * @returns The updated record or null if permission denied
 */
export async function updateRecord(
  tableName: string,
  recordId: string,
  fields: Record<string, any>,
  session: Session | null
) {
  if (!session?.user?.id) {
    throw new Error('Authentication required');
  }
  
  try {
    // Get the record first to check permissions
    const record = await airtableClient(tableName).find(recordId);
    
    // Check if the user has permission to modify this record
    if (!hasPermission(session.user.id, record)) {
      throw new Error('Permission denied');
    }
    
    // Update the record
    const updatedRecord = await airtableClient(tableName).update(recordId, fields);
    return updatedRecord;
  } catch (error) {
    console.error(`Error updating record in ${tableName}:`, error);
    throw new Error(`Failed to update record in ${tableName}`);
  }
}

/**
 * Delete a record in Airtable if the user has permission
 * @param tableName The name of the table
 * @param recordId The ID of the record to delete
 * @param session The current user session
 * @returns The deleted record or null if permission denied
 */
export async function deleteRecord(
  tableName: string,
  recordId: string,
  session: Session | null
) {
  if (!session?.user?.id) {
    throw new Error('Authentication required');
  }
  
  try {
    // Get the record first to check permissions
    const record = await airtableClient(tableName).find(recordId);
    
    // Check if the user has permission to delete this record
    if (!hasPermission(session.user.id, record)) {
      throw new Error('Permission denied');
    }
    
    // Delete the record
    const deletedRecord = await airtableClient(tableName).destroy(recordId);
    return deletedRecord;
  } catch (error) {
    console.error(`Error deleting record in ${tableName}:`, error);
    throw new Error(`Failed to delete record in ${tableName}`);
  }
}

/**
 * Get records created by the current user
 * @param tableName The name of the table
 * @param session The current user session
 * @param options Additional options for the query
 * @returns Array of records created by the user
 */
export async function getUserRecords(
  tableName: string,
  session: Session | null,
  options: Partial<{
    sort: Array<{field: string, direction: 'asc' | 'desc'}>,
    filterByFormula: string,
    maxRecords: number,
    view: string,
  }> = {}
) {
  if (!session?.user?.id) {
    throw new Error('Authentication required');
  }
  
  try {
    // Create a filter to only get records created by this user
    const userFilter = `{CreatorId}='${session.user.id}'`;
    
    // Combine with any existing filter
    const filterByFormula = options.filterByFormula 
      ? `AND(${options.filterByFormula}, ${userFilter})`
      : userFilter;
    
    const records = await airtableClient(tableName).select({
      ...options,
      filterByFormula,
    }).all();
    
    return records;
  } catch (error) {
    console.error(`Error fetching user records from ${tableName}:`, error);
    throw new Error(`Failed to fetch user records from ${tableName}`);
  }
}
