"use client";

interface SketchfabEmbedProps {
  modelId: string;
  title: string;
  className?: string;
}

export default function SketchfabEmbed({
  modelId,
  title,
  className = "",
}: SketchfabEmbedProps) {
  return (
    <div className={`relative ${className}`}>
      <iframe
        title={title}
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_controls=1&ui_stop=0&transparent=1`}
        className="w-full h-full rounded-xl border-0"
      />
    </div>
  );
}
