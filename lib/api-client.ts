/**
 * API Client for Portfolio Admin
 *
 * Fetches data from the deployed portfolio-admin API at build time (SSG).
 * All endpoints are public and CORS-enabled for GitHub Pages.
 *
 * V2 Schema Integration:
 * - All custom `id` fields removed (use `_id` only)
 * - Projects: Added `isCurrent`, `longDescription` is now optional
 * - Certifications: Added `order` for custom sorting
 * - Skills: Flat structure (SkillType[] with nested SkillItem[])
 * - Timeline: Added `address` and `isCurrent`
 * - Testimonials/Blog: Added `order` for custom sorting
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio-admin-eta-ruby.vercel.app';

/**
 * V2 Field Helpers - Safe access to optional V2 fields
 */
export const v2Helpers = {
  isCurrentProject: (project: any) => project?.isCurrent ?? false,
  getCertOrder: (cert: any) => cert?.order ?? 0,
  getSkillOrder: (skill: any) => skill?.order ?? 0,
  getAddress: (timeline: any) => timeline?.address ?? timeline?.location ?? '',
  isCurrentPosition: (timeline: any) => timeline?.isCurrent ?? false,
  getTestimonialOrder: (testimonial: any) => testimonial?.order ?? 0,
  getBlogOrder: (post: any) => post?.order ?? 0,
};

/**
 * In-memory cache with TTL support
 */
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

const apiCache = new Map<string, CacheEntry>();

function getCached<T>(key: string): T | null {
  const entry = apiCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttl) {
    apiCache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache(key: string, data: any, ttl: number): void {
  apiCache.set(key, { data, timestamp: Date.now(), ttl });
}

export function clearAPICache(): void {
  apiCache.clear();
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }

    return data.data as T;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Cached fetch wrapper - checks memory cache before hitting API
 */
async function fetchAPIWithCache<T>(endpoint: string, ttl = 86400 * 1000): Promise<T> {
  const cached = getCached<T>(endpoint);
  if (cached !== null) {
    return cached;
  }
  const data = await fetchAPI<T>(endpoint);
  setCache(endpoint, data, ttl);
  return data;
}

/**
 * Fetch all enums
 */
export async function fetchEnums() {
  return fetchAPIWithCache<{
    projectCategories: string[];
    companies: string[];
    jobRoles: string[];
    certCategories: string[];
    certStatuses: string[];
    skillLevels: string[];
    jobTypes: string[];
    blogCategories: string[];
  }>('/api/public/enums');
}

/**
 * Fetch all projects
 */
export async function fetchProjects(params?: {
  category?: string;
  company?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  limit?: number;
  page?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params?.category) queryParams.append('category', params.category);
  if (params?.company) queryParams.append('company', params.company);
  if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));
  if (params?.isFeatured !== undefined) queryParams.append('isFeatured', String(params.isFeatured));
  if (params?.limit) queryParams.append('limit', String(params.limit));
  if (params?.page) queryParams.append('page', String(params.page));

  const query = queryParams.toString();
  const endpoint = `/api/public/projects${query ? `?${query}` : ''}`;

  const projects = await fetchAPIWithCache<any[]>(endpoint);

  return projects.map(project => ({
    ...project,
    startDate: project.startDate ? new Date(project.startDate) : new Date(),
    endDate: project.endDate ? new Date(project.endDate) : null,
  }));
}

/**
 * Fetch all certifications
 */
export async function fetchCertifications(params?: {
  category?: string;
  status?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params?.category) queryParams.append('category', params.category);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.featured !== undefined) queryParams.append('featured', String(params.featured));
  if (params?.limit) queryParams.append('limit', String(params.limit));
  if (params?.page) queryParams.append('page', String(params.page));

  const query = queryParams.toString();
  const endpoint = `/api/public/certifications${query ? `?${query}` : ''}`;

  return fetchAPIWithCache<any[]>(endpoint);
}

/**
 * Fetch skill hierarchy
 */
export async function fetchSkillHierarchy() {
  return fetchAPIWithCache<any[]>('/api/public/skill-hierarchy');
}

/**
 * Fetch all timeline entries
 */
export async function fetchTimeline() {
  const timeline = await fetchAPIWithCache<any[]>('/api/public/timeline');

  return timeline.map(entry => ({
    ...entry,
    startDate: entry.startDate ? new Date(entry.startDate) : new Date(),
    endDate: entry.endDate ? new Date(entry.endDate) : null,
  }));
}

/**
 * Fetch all testimonials
 */
export async function fetchTestimonials() {
  try {
    return await fetchAPIWithCache<any[]>('/api/public/testimonials');
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
}

/**
 * Fetch all blog posts
 */
export async function fetchBlogPosts(params?: {
  category?: string;
  isPublished?: boolean;
  limit?: number;
  page?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params?.category) queryParams.append('category', params.category);
  if (params?.isPublished !== undefined) queryParams.append('isPublished', String(params.isPublished));
  if (params?.limit) queryParams.append('limit', String(params.limit));
  if (params?.page) queryParams.append('page', String(params.page));

  const query = queryParams.toString();
  const endpoint = `/api/public/blog${query ? `?${query}` : ''}`;

  return fetchAPIWithCache<any[]>(endpoint);
}

/**
 * Fetch portfolio metadata
 */
export async function fetchPortfolioMetadata() {
  const DEFAULTS = { displaySettings: { showLookingForSection: false } };
  try {
    const cached = getCached<any>('/api/public/metadata');
    if (cached) return cached;

    const response = await fetch(`${API_BASE_URL}/api/public/metadata`, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn('Portfolio metadata not available, using defaults');
      return DEFAULTS;
    }

    const result = await response.json();
    const data = result.data || DEFAULTS;
    setCache('/api/public/metadata', data, 3600 * 1000);
    return data;
  } catch (error) {
    console.error('Failed to fetch portfolio metadata:', error);
    return DEFAULTS;
  }
}

/**
 * Fetch achievements
 */
export async function fetchAchievements(params?: {
  activeOnly?: boolean;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params?.activeOnly !== undefined) queryParams.append('activeOnly', String(params.activeOnly));
  if (params?.limit) queryParams.append('limit', String(params.limit));

  const query = queryParams.toString();
  const endpoint = `/api/public/achievements${query ? `?${query}` : ''}`;

  try {
    return await fetchAPIWithCache<any[]>(endpoint);
  } catch (error) {
    console.error('Failed to fetch achievements:', error);
    return [];
  }
}

/**
 * Fetch certifications WITHOUT heavy image fields (for GlobalSearch etc.)
 */
export async function fetchCertificationsLight(params?: {
  category?: string;
  status?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}) {
  const certs = await fetchCertifications(params);
  return certs.map(({ image, thumbImage, ...rest }) => rest);
}
