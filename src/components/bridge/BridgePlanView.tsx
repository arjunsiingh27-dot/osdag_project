import { useBridge } from "@/context/BridgeContext";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { useState } from "react";

export function BridgePlanView() {
  const { state } = useBridge();
  const { overallBridgeWidth, span, skewAngle, girderCount, girderSpacing, deckOverhang } = state;

  const svgW = 700;
  const svgH = 400;
  const margin = 60;

  // Scale
  const scaleX = (svgW - margin * 2) / Math.max(overallBridgeWidth, 1);
  const scaleY = (svgH - margin * 2) / Math.max(span, 1);

  const left = margin;
  const top = margin;
  const w = overallBridgeWidth * scaleX;
  const h = span * scaleY;

  // Skew offset
  const skewRad = (skewAngle * Math.PI) / 180;
  const skewOffset = Math.tan(skewRad) * h;

  // Girder positions
  const firstGirder = left + deckOverhang * scaleX;

  const [scale, setScale] = useState(1);

  return (
    <div className="w-full relative rounded-md border border-border/50 bg-white/5 dark:bg-black/5 overflow-hidden">
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 bg-background/80 backdrop-blur-sm p-1 rounded-md border shadow-sm">
        <button className="p-1.5 hover:bg-muted rounded text-foreground transition-colors cursor-pointer" onClick={() => setScale(s => Math.min(s + 0.2, 3))} title="Zoom In">
          <Plus className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-muted rounded text-foreground transition-colors cursor-pointer" onClick={() => setScale(s => Math.max(s - 0.2, 0.5))} title="Zoom Out">
          <Minus className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-muted rounded text-foreground transition-colors cursor-pointer" onClick={() => setScale(1)} title="Reset Zoom">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full h-full max-h-[500px] overflow-auto">
        <div style={{ width: `${scale * 100}%`, minWidth: '100%', transition: 'width 0.2s ease-out' }} className="flex items-center justify-center min-h-[300px] p-2">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
        {/* Bridge deck outline with skew */}
        <polygon
          points={`${left},${top} ${left + w},${top} ${left + w + skewOffset},${top + h} ${left + skewOffset},${top + h}`}
          fill="hsl(var(--muted))"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* Girder lines */}
        {Array.from({ length: girderCount }).map((_, i) => {
          const gx = firstGirder + i * girderSpacing * scaleX;
          return (
            <line
              key={i}
              x1={gx}
              y1={top}
              x2={gx + skewOffset}
              y2={top + h}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6,3"
            />
          );
        })}

        {/* Width label */}
        <text x={left + w / 2} y={top - 10} textAnchor="middle" className="text-[10px] fill-foreground">
          Width: {overallBridgeWidth.toFixed(2)}m
        </text>

        {/* Span label */}
        <text x={left - 10} y={top + h / 2} textAnchor="middle" className="text-[10px] fill-foreground" transform={`rotate(-90 ${left - 10} ${top + h / 2})`}>
          Span: {span.toFixed(2)}m
        </text>

        {skewAngle !== 0 && (
          <text x={left + w / 2 + skewOffset / 2} y={top + h + 25} textAnchor="middle" className="text-[10px] fill-primary font-medium">
            Skew Angle: {skewAngle}°
          </text>
        )}

        <text x={svgW / 2} y={svgH - 10} textAnchor="middle" className="text-[12px] fill-foreground font-bold">
          BRIDGE PLAN VIEW
        </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
