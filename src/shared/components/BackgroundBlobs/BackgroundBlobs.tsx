// Decorative blurred SVG blobs used as a global background layer

export function BackgroundBlobs() {
  return (
    <div className="bgBlobs" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter
            id="spotBlur"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
          </filter>
        </defs>

        <g filter="url(#spotBlur)" opacity="0.9">
          <ellipse cx="-100" cy="220" rx="420" ry="340" fill="#3E137E" fillOpacity={0.6} />
        </g>

        <g filter="url(#spotBlur)" opacity={0.75}>
          <ellipse cx="1180" cy="160" rx="260" ry="230" fill="#7B3EF5" fillOpacity={0.4} />
        </g>

        <g filter="url(#spotBlur)" opacity={0.8}>
          <ellipse cx="760" cy="820" rx="340" ry="300" fill="#461491ff" fillOpacity={0.3} />
        </g>
      </svg>
    </div>
  );
}
