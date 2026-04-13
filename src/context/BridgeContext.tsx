import { createContext, useContext, useState, ReactNode } from "react";

export interface BridgeState {
  structureType: string;
  locationMode: "enter" | "custom";
  state: string;
  district: string;
  span: number;
  carriagewayWidth: number;
  footpath: string;
  skewAngle: number;
  overallBridgeWidth: number;
  girderCount: number;
  girderSpacing: number;
  deckOverhang: number;
  girderGrade: string;
  crossBracingGrade: string;
  deckGrade: string;
  customWind: string;
  customSeismic: string;
  customTempMax: string;
  customTempMin: string;
}

interface BridgeContextType {
  state: BridgeState;
  update: (partial: Partial<BridgeState>) => void;
  reset: () => void;
}

const defaults: BridgeState = {
  structureType: "Highway",
  locationMode: "enter",
  state: "",
  district: "",
  span: 30,
  carriagewayWidth: 12,
  footpath: "Both",
  skewAngle: 0,
  overallBridgeWidth: 17,
  girderCount: 4,
  girderSpacing: 3,
  deckOverhang: 1.5,
  girderGrade: "",
  crossBracingGrade: "",
  deckGrade: "",
  customWind: "",
  customSeismic: "",
  customTempMax: "",
  customTempMin: "",
};

const BridgeContext = createContext<BridgeContextType | null>(null);

export function BridgeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BridgeState>({ ...defaults });

  const update = (partial: Partial<BridgeState>) => {
    setState((prev) => {
      const next = { ...prev, ...partial };
      // Auto-compute overall bridge width
      if ("carriagewayWidth" in partial || "footpath" in partial) {
        const fw = next.footpath === "None" ? 0 : next.footpath === "Single" ? 2.5 : 5;
        next.overallBridgeWidth = next.carriagewayWidth + fw;
      }
      return next;
    });
  };

  const reset = () => setState({ ...defaults });

  return (
    <BridgeContext.Provider value={{ state, update, reset }}>
      {children}
    </BridgeContext.Provider>
  );
}

export function useBridge() {
  const ctx = useContext(BridgeContext);
  if (!ctx) throw new Error("useBridge must be used within BridgeProvider");
  return ctx;
}
