const GITHUB_API = 'https://api.github.com';
const OWNER = 'nazuraki';

function getHeaders(): HeadersInit {
  const token = import.meta.env.GH_TOKEN;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  visibility: string;
  license: { spdx_id: string; name: string } | null;
}

export async function getRepos(): Promise<Repo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${OWNER}/repos?type=public&sort=pushed&per_page=100`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  const repos: Repo[] = await res.json();
  const excluded = new Set(['nazuraki.github.io', 'steward', 'ntl-torrent']);
  return repos.filter(r => !r.fork && !excluded.has(r.name));
}

export async function getRepo(name: string): Promise<Repo> {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${name}`, { headers: getHeaders() });
  if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
  return res.json();
}

export async function getLanguages(name: string): Promise<Record<string, number>> {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${name}/languages`, { headers: getHeaders() });
  if (!res.ok) return {};
  return res.json();
}

/** Compute language distribution percentages from a languages byte-count map. */
export function langPercentages(langs: Record<string, number>): { name: string; pct: number }[] {
  const total = Object.values(langs).reduce((a, b) => a + b, 0);
  if (total === 0) return [];
  return Object.entries(langs)
    .sort(([, a], [, b]) => b - a)
    .map(([name, bytes]) => ({ name, pct: Math.round((bytes / total) * 100) }));
}

/** Format an ISO date to a short human-readable string. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Derive an archive index from position (e.g. 0 → "0x01"). */
export function archiveIndex(i: number): string {
  return `0x${String(i + 1).padStart(2, '0')}`;
}
