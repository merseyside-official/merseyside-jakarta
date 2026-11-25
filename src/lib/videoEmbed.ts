export interface ParsedVideoEmbed {
  provider: "youtube" | "gdrive";
  videoId: string;
  embedUrl: string;
  externalUrl: string;
}

/**
 * Mengubah URL YouTube atau Google Drive (termasuk ID YouTube langsung)
 * menjadi konfigurasi embed iframe yang aman dan seragam.
 */
export function parseVideoEmbed(input: string): ParsedVideoEmbed | null {
  const value = input.trim();
  if (!value) return null;

  // 1. Google Drive file URL (/file/d/<ID>/view atau ?id=<ID>)
  const drivePathMatch = value.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveQueryMatch = value.match(/drive\.google\.com\/open\?[^#]*id=([a-zA-Z0-9_-]+)/);
  const driveId = drivePathMatch?.[1] ?? driveQueryMatch?.[1];
  if (driveId) {
    return {
      provider: "gdrive",
      videoId: driveId,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      externalUrl: `https://drive.google.com/file/d/${driveId}/view`,
    };
  }

  // 2. YouTube raw ID (11 karakter standar)
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return {
      provider: "youtube",
      videoId: value,
      embedUrl: `https://www.youtube-nocookie.com/embed/${value}?rel=0`,
      externalUrl: `https://www.youtube.com/watch?v=${value}`,
    };
  }

  // 3. YouTube full URL (watch?v=, youtu.be/, /shorts/, /embed/)
  try {
    const parsed = new URL(value);
    let ytId = "";

    if (parsed.hostname.includes("youtu.be")) {
      ytId = parsed.pathname.replace(/^\//, "").split("/")[0] || "";
    } else if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtube-nocookie.com")) {
      if (parsed.pathname === "/watch") {
        ytId = parsed.searchParams.get("v") || "";
      } else {
        const segmentMatch = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]+)/);
        ytId = segmentMatch?.[1] || "";
      }
    }

    if (ytId) {
      return {
        provider: "youtube",
        videoId: ytId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?rel=0`,
        externalUrl: `https://www.youtube.com/watch?v=${ytId}`,
      };
    }
  } catch {
    return null;
  }

  return null;
}
