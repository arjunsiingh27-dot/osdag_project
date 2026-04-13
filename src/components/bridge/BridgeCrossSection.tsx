import { useBridge } from "@/context/BridgeContext";
import { useTranslation } from "@/context/translations";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { useState } from "react";

export function BridgeCrossSection() {
  const { state } = useBridge();
  const t = useTranslation(state.language);
  const {
    carriagewayWidth,
    overallBridgeWidth,
    girderCount,
    girderSpacing,
    deckOverhang,
    footpath,
    skewAngle,
    span,
  } = state;

  // SVG dimensions
  const svgW = 800;
  const svgH = 300;
  const cx = svgW / 2;
  const deckY = 100;
  const deckH = 20;

  // Clamp visualization values to prevent SVG clipping bounds
  const visSpan = Math.min(Math.max(span || 5, 5), 100);
  const visWidth = Math.min(Math.max(overallBridgeWidth || 2, 2), 50);
  const visSkew = Math.min(Math.max(skewAngle || 0, -60), 60);

  // Girder height scales with span (20m→60px, 45m→120px)
  const girderH = 60 + ((Math.min(Math.max(visSpan, 20), 45) - 20) / 25) * 60;
  const bottomY = deckY + deckH + girderH;

  // Scale: map overallBridgeWidth to ~90% of SVG width to make it larger
  const scale = (svgW * 0.90) / Math.max(visWidth, 1);

  const deckLeft = cx - (overallBridgeWidth * scale) / 2;
  const deckRight = cx + (overallBridgeWidth * scale) / 2;
  const deckWidth = deckRight - deckLeft;

  // Girder positions
  const girderPositions: number[] = [];
  const firstGirder = deckLeft + deckOverhang * scale;
  for (let i = 0; i < girderCount; i++) {
    girderPositions.push(firstGirder + i * girderSpacing * scale);
  }

  // Footpath regions
  const fpWidth = footpath === "None" ? 0 : 2.5 * scale;

  // Skew: shift bottom of girders horizontally
  const skewRad = (visSkew * Math.PI) / 180;
  const skewShift = Math.tan(skewRad) * girderH;

  const [zoomScale, setZoomScale] = useState(1);

  return (
    <div className="w-full relative rounded-md border border-border/50 bg-white/5 dark:bg-black/5 overflow-hidden">
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 bg-background/80 backdrop-blur-sm p-1 rounded-md border shadow-sm">
        <button className="p-1.5 hover:bg-muted rounded text-foreground transition-colors cursor-pointer" onClick={() => setZoomScale(s => Math.min(s + 0.2, 3))} title="Zoom In">
          <Plus className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-muted rounded text-foreground transition-colors cursor-pointer" onClick={() => setZoomScale(s => Math.max(s - 0.2, 0.5))} title="Zoom Out">
          <Minus className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-muted rounded text-foreground transition-colors cursor-pointer" onClick={() => setZoomScale(1)} title="Reset Zoom">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full h-full max-h-[500px] overflow-auto">
        <div style={{ width: `${zoomScale * 100}%`, minWidth: '100%', transition: 'width 0.2s ease-out' }} className="flex items-center justify-center min-h-[300px] p-2">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
        {/* Arrow markers */}
        <defs>
          <marker id="arrowL" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
            <path d="M6,0 L0,3 L6,6" fill="none" stroke="currentColor" strokeWidth="1" />
          </marker>
          <marker id="arrowR" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" strokeWidth="1" />
          </marker>
        </defs>

        {/* Carriageway label */}
        <text x={cx} y={deckY - 30} textAnchor="middle" className="text-[11px] fill-foreground font-medium">
          {t("Carriageway")}: {carriagewayWidth.toFixed(2)}m
        </text>

        {/* Carriageway dimension line */}
        {footpath !== "None" && (
          <line
            x1={footpath === "Both" ? deckLeft + fpWidth : deckLeft}
            y1={deckY - 20}
            x2={footpath === "Both" ? deckRight - fpWidth : deckRight - fpWidth}
            y2={deckY - 20}
            stroke="currentColor"
            strokeWidth="1"
            markerStart="url(#arrowL)"
            markerEnd="url(#arrowR)"
          />
        )}

        {/* Deck slab */}
        <rect
          x={deckLeft}
          y={deckY}
          width={deckWidth}
          height={deckH}
          fill="hsl(var(--muted))"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* Footpath shading */}
        {(footpath === "Both" || footpath === "Single") && (
          <rect x={deckLeft} y={deckY} width={fpWidth} height={deckH} fill="hsl(var(--primary) / 0.2)" stroke="currentColor" strokeWidth="0.5" />
        )}
        {footpath === "Both" && (
          <rect x={deckRight - fpWidth} y={deckY} width={fpWidth} height={deckH} fill="hsl(var(--primary) / 0.2)" stroke="currentColor" strokeWidth="0.5" />
        )}

        {/* Footpath labels */}
        {(footpath === "Both" || footpath === "Single") && (
          <text x={deckLeft + fpWidth / 2} y={deckY - 6} textAnchor="middle" className="text-[9px] fill-muted-foreground">{t("Foot path")}</text>
        )}
        {footpath === "Both" && (
          <text x={deckRight - fpWidth / 2} y={deckY - 6} textAnchor="middle" className="text-[9px] fill-muted-foreground">{t("Foot path")}</text>
        )}

        {/* Girders with skew — bottom shifts horizontally */}
        {girderPositions.map((gx, i) => {
          const bottomX = gx + skewShift;
          return (
            <g key={i}>
              {/* Girder as a parallelogram when skewed */}
              <polygon
                points={`${gx - 3},${deckY + deckH} ${gx + 3},${deckY + deckH} ${bottomX + 3},${bottomY} ${bottomX - 3},${bottomY}`}
                fill="currentColor"
                opacity="0.8"
              />
              {/* Base plate */}
              <rect x={bottomX - 6} y={bottomY} width={12} height={5} fill="currentColor" />

              {/* Cross bracing to next girder */}
              {i < girderPositions.length - 1 && (() => {
                const nextGx = girderPositions[i + 1];
                const nextBottomX = nextGx + skewShift;
                return (
                  <>
                    <line
                      x1={gx}
                      y1={deckY + deckH + 10}
                      x2={nextBottomX}
                      y2={bottomY - 10}
                      stroke="currentColor"
                      strokeWidth="0.8"
                      opacity="0.5"
                    />
                    <line
                      x1={bottomX}
                      y1={bottomY - 10}
                      x2={nextGx}
                      y2={deckY + deckH + 10}
                      stroke="currentColor"
                      strokeWidth="0.8"
                      opacity="0.5"
                    />
                  </>
                );
              })()}
            </g>
          );
        })}

        {/* Overhang dimensions */}
        {deckOverhang > 0 && (
          <>
            <line x1={deckLeft} y1={bottomY + 20} x2={firstGirder} y2={bottomY + 20} stroke="currentColor" strokeWidth="0.8" markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
            <text x={(deckLeft + firstGirder) / 2} y={bottomY + 35} textAnchor="middle" className="text-[9px] fill-muted-foreground">
              {deckOverhang.toFixed(2)}m
            </text>
            <line x1={girderPositions[girderPositions.length - 1]} y1={bottomY + 20} x2={deckRight} y2={bottomY + 20} stroke="currentColor" strokeWidth="0.8" markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
            <text x={(girderPositions[girderPositions.length - 1] + deckRight) / 2} y={bottomY + 35} textAnchor="middle" className="text-[9px] fill-muted-foreground">
              {deckOverhang.toFixed(2)}m
            </text>
          </>
        )}

        {/* Girder depth dimension on the right */}
        <line x1={deckRight + 20} y1={deckY + deckH} x2={deckRight + 20} y2={bottomY} stroke="currentColor" strokeWidth="0.8" markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
        <text x={deckRight + 25} y={deckY + deckH + girderH / 2 + 4} className="text-[9px] fill-muted-foreground" textAnchor="start">
          Depth
        </text>

        {/* Info texts */}
        <text x={cx} y={bottomY + 55} textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">
          {girderCount} STEEL GIRDERS @ {girderSpacing.toFixed(2)}M C/C | SPAN: {span.toFixed(1)}M
          {skewAngle !== 0 ? ` | SKEW: ${skewAngle}°` : ""}
        </text>

        <text x={cx} y={bottomY + 75} textAnchor="middle" className="text-[12px] fill-foreground font-bold">
          COMPOSITE BRIDGE CROSS-SECTION
        </text>
        <text x={cx} y={bottomY + 90} textAnchor="middle" className="text-[10px] fill-primary font-medium">
          Total Deck Width: {overallBridgeWidth.toFixed(2)}m
        </text>
          </svg>
        </div>
      </div>

      {/* Info summary below SVG */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm mt-4 px-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("Clear Width")}</span>
          <span className="font-semibold">{carriagewayWidth.toFixed(2)}m</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("Girders")}</span>
          <span className="font-semibold">{girderCount} Nos.</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("Girder Spacing")}</span>
          <span className="font-semibold">{girderSpacing.toFixed(2)}m</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("Span")}</span>
          <span className="font-semibold">{span.toFixed(2)}m</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("Skew Angle")}</span>
          <span className="font-semibold">{skewAngle}°</span>
        </div>
      </div>
    </div>
  );
}
