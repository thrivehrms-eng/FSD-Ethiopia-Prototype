import type { APIRoute } from 'astro';
import { searchIndex } from '../../lib/searchIndex';

export const GET: APIRoute = () => new Response(JSON.stringify(searchIndex('am')), { headers: { 'content-type': 'application/json' } });
