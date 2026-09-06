import PageHead from "@/components/admin/PageHead";
import VideoEditor, {
  type VideoEditorRow,
} from "@/components/admin/VideoEditor";
import { getVideos } from "@/lib/admin-data";
import { NAHUALES, glyphSrcForIndex } from "@/lib/nahual";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const { videos, error } = await getVideos();
  const byIndex = new Map(videos.map((video) => [video.nahual_index, video]));

  const rows: VideoEditorRow[] = NAHUALES.map((name, position) => {
    const nahualIndex = position + 1;
    const entry = byIndex.get(nahualIndex);
    return {
      nahualIndex,
      name,
      glyphSrc: glyphSrcForIndex(nahualIndex, "card"),
      videoId: entry?.youtube_video_id ?? "",
      title: entry?.title ?? "",
    };
  });

  const assigned = rows.filter((row) => row.videoId).length;

  return (
    <>
      <PageHead
        eyebrow="Inhalte"
        title="Videos"
        description="Jedem der 20 Nahuales ein Video zuordnen. Es erscheint auf der öffentlichen Seite dieses Nahuals und im Profil aller Menschen mit diesem Geburtsnahual. Ganze URL einfügen genügt — die ID wird daraus gelesen."
      />

      {error && <p className="admin-note admin-note-error">{error}</p>}

      <p className="admin-note">
        <strong>{assigned} von 20</strong> Nahuales haben ein Video.
      </p>

      <section className="admin-panel">
        <div className="admin-panel-body">
          <VideoEditor rows={rows} />
        </div>
      </section>
    </>
  );
}
