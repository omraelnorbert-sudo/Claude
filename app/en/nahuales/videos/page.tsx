import type { Metadata } from "next";
import Link from "next/link";
import { NAHUALES, slugForIndex } from "@/lib/nahual";
import { getAllNahualVideos } from "@/lib/public-data";

const description =
  "Video explanations of the 20 Nahuales of the Tzolk'in calendar — in-depth knowledge of every MAYA day sign.";

export const metadata: Metadata = {
  title: "Nahual videos",
  description,
  alternates: { canonical: "/en/nahuales/videos" },
  openGraph: { title: "Nahual videos", description, url: "/en/nahuales/videos" },
};

export default async function NahualVideosPageEn() {
  const videos = await getAllNahualVideos();

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Nahuales
      </div>
      <h1>Videos</h1>
      <p>All the Nahual videos in one place.</p>

      {videos.length === 0 ? (
        <p className="empty-state">Nahual videos will be added here soon.</p>
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
                <Link href={`/en/nahuales/${slugForIndex(video.nahualIndex)}`}>
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
