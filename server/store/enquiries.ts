export interface StoredEnquiry {
  id: string;
  userId: string | null;
  name: string;
  contact: string;
  topic: string;
  message: string;
  createdAt: string;
}

const enquiries: StoredEnquiry[] = [];

export function addEnquiry(entry: StoredEnquiry): StoredEnquiry {
  enquiries.unshift(entry);
  return entry;
}

export function listEnquiriesForUser(userId: string): StoredEnquiry[] {
  return enquiries.filter((item) => item.userId === userId);
}
