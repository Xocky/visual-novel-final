export default function ProgressBar({ campfires = 3, current = 0 }) {
  return (
    <div className="progress-container">
      {[...Array(campfires)].map((_, idx) => (
        <div 
          key={idx} 
          className={`progress-segment ${idx < current ? 'completed' : ''} ${idx === current ? 'active' : ''}`}
        >
          {idx === current && <div className="current-marker">🔥</div>}
          <div className="segment-label">Костер {idx + 1}</div>
        </div>
      ))}
    </div>
  );
} 