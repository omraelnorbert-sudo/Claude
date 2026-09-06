import type { Metadata } from "next";
import Link from "next/link";
import { NAHUALES, slugForIndex } from "@/lib/nahual";
import { getAllNahualVideos } from "@/lib/public-data";

const description =
  "Video-Erklärungen zu den 20 Nahuales des Tzolk'in-Kalenders — vertiefendes Wissen zu jedem Maya-Tageszeichen.";

export const metadata: Metadata = {
  title: "Nahual-Videos",
  description,
  alternates: { canonical: "/nahuales/videos" },
  openGraph: { title: "Nahual-Videos", description, url: "/nahuales/videos" },
};

export default async function NahualVideosPage() {
  const videos = await getAllNahualVideos();

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Nahuales
      </div>
      <h1>Videos</h1>
      <p>Alle Nahual-Videos an einem Ort.</p>

      {videos.length === 0 ? (
        <p className="empty-state">Bald findest du hier Videos zu den Nahuales.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-4)",
            marginTop: "var(--space-4)",
          }}
        >
          {videos.map((video) => {
            const name = NAHUALES[video.nahualIndex - 1];
            return (
              <div key={video.nahualIndex}>
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    border: "1px solid var(--line-card)",
                    marginBottom: 10,
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title || name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                  />
                </div>
                <Link href={`/nahuales/${slugForIndex(video.nahualIndex)}`}>
                  {name}
                </Link>
                {video.title && (
                  <p style={{ margin: "4px 0 0", fontSize: 15, color: "var(--text-muted)" }}>
                    {video.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
