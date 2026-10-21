import type { PyxisPage } from './types';

const API_URL = process.env.INTERNAL_API_URL;

/**
 * Fetches a page from Pyxis CMS by its path ("" or undefined = homepage).
 * Returns null when the page does not exist or is not available (404).
 *
 * Published pages are cached for an hour and purged on publish through /api/revalidate;
 * previews always fetch fresh data.
 */
export async function fetchPage(path: string | undefined, previewToken?: string): Promise<PyxisPage | null> {
    const url = path ? `${API_URL}/api/pages/${path}` : `${API_URL}/api/pages`;

    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            ...(previewToken ? { 'X-Pyxis-Preview': previewToken } : {}),
        },
        ...(previewToken ? { cache: 'no-store' } : { next: { revalidate: 3600 } }),
        signal: AbortSignal.timeout(5000),
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Pyxis API responded with ${response.status} for ${url}`);
    }

    const { data } = (await response.json()) as { data: PyxisPage };

    return data;
}