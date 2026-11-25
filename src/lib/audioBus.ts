/**
 * Lightweight browser event bus ensuring only one audio player plays at a time
 * across VinylShowcase and MusicSection without coupling React component trees.
 */
const AUDIO_PLAY_EVENT = "merseyside:audio-play";

export function notifyAudioPlay(playerId: string): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUDIO_PLAY_EVENT, { detail: playerId }));
  }
}

export function subscribeOtherAudioPlay(
  playerId: string,
  onOtherPlay: () => void
): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<string>;
    if (customEvent.detail !== playerId) {
      onOtherPlay();
    }
  };
  window.addEventListener(AUDIO_PLAY_EVENT, handler);
  return () => window.removeEventListener(AUDIO_PLAY_EVENT, handler);
}
