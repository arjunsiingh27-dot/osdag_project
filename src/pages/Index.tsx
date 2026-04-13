import { useState } from "react";
import { BridgeProvider, useBridge } from "@/context/BridgeContext";
import { TypeOfStructure } from "@/components/bridge/TypeOfStructure";
import { ProjectLocation } from "@/components/bridge/ProjectLocation";
import { GeometricDetails } from "@/components/bridge/GeometricDetails";
import { MaterialInputs } from "@/components/bridge/MaterialInputs";
import { BridgeCrossSection } from "@/components/bridge/BridgeCrossSection";
import { BridgePlanView } from "@/components/bridge/BridgePlanView";
import { SectionHeader } from "@/components/bridge/SectionHeader";
import { Button } from "@/components/ui/button";
import { RotateCcw, Download } from "lucide-react";
import { SettingsMenu } from "@/components/SettingsMenu";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/translations";

function GirderFlowApp() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState<"basic" | "additional">("basic");
  const [viewTab, setViewTab] = useState<"cross" | "plan">("cross");
  const { reset } = useBridge();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-section-header-foreground rounded-md p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 17h18M6 17V9l6-4 6 4v8M9 17v-4h6v4" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-lg font-bold text-section-header-foreground tracking-wide">GirderFlow</h1>
        </div>
        <SettingsMenu />
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-[52%] min-w-[400px] border-r border-border overflow-y-auto">
          {/* Tabs */}
          <div className="flex items-center border-b border-border">
            <button
              className={`px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === "basic"
                  ? "bg-primary text-section-header-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("basic")}
            >
              {t("Basic Inputs")}
            </button>
            <button
              className={`px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === "additional"
                  ? "bg-primary text-section-header-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("additional")}
            >
              {t("Additional Inputs")}
            </button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={reset}
              className="mr-2 text-muted-foreground hover:text-foreground"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Tab content */}
          <div className="p-4 space-y-4">
            {activeTab === "basic" ? (
              <>
                <TypeOfStructure />
                <ProjectLocation />
                <GeometricDetails />
                <MaterialInputs />
              </>
            ) : (
              <div className="border border-border rounded-md">
                <SectionHeader title={t("Additional Inputs")} />
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Additional inputs will be available in future updates.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 overflow-y-auto">
          {/* View tabs */}
          <div className="flex items-center justify-end gap-1 px-4 pt-4">
            <button
              className={`px-4 py-1.5 text-sm rounded-md border transition-colors ${
                viewTab === "cross"
                  ? "bg-card border-border font-medium shadow-sm"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setViewTab("cross")}
            >
              {t("Cross Section")}
            </button>
            <button
              className={`px-4 py-1.5 text-sm rounded-md border transition-colors ${
                viewTab === "plan"
                  ? "bg-card border-border font-medium shadow-sm"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setViewTab("plan")}
            >
              {t("Plan View")}
            </button>
          </div>

          {/* Cross section / Plan view */}
          <div className="p-4">
            <div className="border border-border rounded-md overflow-hidden">
              <div className="flex items-center justify-between bg-primary px-4 py-2">
                <h3 className="text-sm font-semibold text-section-header-foreground">
                  {viewTab === "cross"
                    ? t("Bridge Cross Section (For Nomenclature Only)")
                    : t("Plan View")}
                </h3>
                <button className="flex items-center gap-1 text-section-header-foreground text-sm opacity-80 hover:opacity-100">
                  <Download className="w-4 h-4" />
                  {t("Export")}
                </button>
              </div>
              <div className="p-4 bg-card">
                {viewTab === "cross" ? <BridgeCrossSection /> : <BridgePlanView />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Index = () => (
  <LanguageProvider>
    <BridgeProvider>
      <GirderFlowApp />
    </BridgeProvider>
  </LanguageProvider>
);

export default Index;
