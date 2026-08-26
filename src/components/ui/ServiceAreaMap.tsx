"use client";

type Props = {
  /** Default map query when no ZIP has been checked. */
  defaultQuery: string;
  /** Human-readable label for the default view. */
  defaultLabel: string;
};

function buildMapSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
}

export default function ServiceAreaMap({ defaultQuery, defaultLabel }: Props) {
  const mapSrc = buildMapSrc(defaultQuery);

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* Map */}
      <div className="relative rounded-[18px] overflow-hidden border border-border-light bg-progress-bg w-full">
        <div className="aspect-[4/3] w-full">
          <iframe
            key={mapSrc}
            title={`Service area map — ${defaultLabel}`}
            src={mapSrc}
            className="w-full h-full block border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
