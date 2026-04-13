import { useState } from "react";
import { useBridge } from "@/context/BridgeContext";
import { useTranslation } from "@/context/translations";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "./SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function GeometricDetails() {
  const { state, update } = useBridge();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempSpacing, setTempSpacing] = useState(state.girderSpacing);
  const [tempGirders, setTempGirders] = useState(state.girderCount);
  const [tempOverhang, setTempOverhang] = useState(state.deckOverhang);
  const [geoError, setGeoError] = useState("");
  const disabled = state.structureType === "Other";

  const spanError =
    state.span < 20 || state.span > 45 ? "Outside the software range." : "";
  const cwError =
    state.carriagewayWidth < 4.25 || state.carriagewayWidth > 24
      ? "Carriageway width must be between 4.25 m and 24 m."
      : "";
  const skewError =
    Math.abs(state.skewAngle) > 15
      ? "IRC 24 (2010) requires detailed analysis when skew angle exceeds ±15°."
      : "";

  const openDialog = () => {
    setTempSpacing(state.girderSpacing);
    setTempGirders(state.girderCount);
    setTempOverhang(state.deckOverhang);
    setGeoError("");
    setDialogOpen(true);
  };

  const recalcFromSpacing = (spacing: number) => {
    setTempSpacing(spacing);
    if (spacing > 0) {
      const g = Math.round((state.overallBridgeWidth - tempOverhang * 2) / spacing) + 1;
      setTempGirders(g > 0 ? g : 1);
    }
    validate(spacing, tempGirders, tempOverhang);
  };

  const recalcFromGirders = (girders: number) => {
    setTempGirders(girders);
    if (girders > 1) {
      const s = parseFloat(((state.overallBridgeWidth - tempOverhang * 2) / (girders - 1)).toFixed(1));
      setTempSpacing(s > 0 ? s : 0.1);
    }
    validate(tempSpacing, girders, tempOverhang);
  };

  const recalcFromOverhang = (overhang: number) => {
    setTempOverhang(overhang);
    if (tempGirders > 1) {
      const s = parseFloat(((state.overallBridgeWidth - overhang * 2) / (tempGirders - 1)).toFixed(1));
      setTempSpacing(s > 0 ? s : 0.1);
    }
    validate(tempSpacing, tempGirders, overhang);
  };

  const validate = (spacing: number, girders: number, overhang: number) => {
    if (spacing >= state.overallBridgeWidth) {
      setGeoError("Girder spacing must be less than overall width.");
    } else if (overhang * 2 >= state.overallBridgeWidth) {
      setGeoError("Total overhang must be less than overall width.");
    } else if (girders < 2) {
      setGeoError("Minimum 2 girders required.");
    } else {
      setGeoError("");
    }
  };

  const applyGeometry = () => {
    if (!geoError) {
      update({
        girderSpacing: tempSpacing,
        girderCount: tempGirders,
        deckOverhang: tempOverhang,
      });
      setDialogOpen(false);
    }
  };

  return (
    <div className="border border-border rounded-md">
      <SectionHeader title={t("Geometric Details")}>
        <Button
          size="sm"
          variant="outline"
          onClick={openDialog}
          disabled={disabled}
          className="bg-warning text-warning-foreground border-none hover:opacity-90 text-xs h-7"
        >
          {t("Modify Additional Geometry")}
        </Button>
      </SectionHeader>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-muted-foreground">{t("Span (m)")}</Label>
            <Input
              type="number"
              min={10}
              max={100}
              value={state.span}
              onChange={(e) => update({ span: parseFloat(e.target.value) || 0 })}
              placeholder="20-45"
              disabled={disabled}
            />
            {spanError && <p className="text-destructive text-xs mt-1">{spanError}</p>}
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">{t("Carriageway Width (m)")}</Label>
            <Input
              type="number"
              min={2}
              max={50}
              value={state.carriagewayWidth}
              onChange={(e) => update({ carriagewayWidth: parseFloat(e.target.value) || 0 })}
              disabled={disabled}
            />
            {cwError && <p className="text-destructive text-xs mt-1">{cwError}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-muted-foreground">{t("Footpath")}</Label>
            <Select
              value={state.footpath}
              onValueChange={(v) => update({ footpath: v })}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Both">Both</SelectItem>
                <SelectItem value="Single">Single-sided</SelectItem>
                <SelectItem value="None">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">{t("Skew Angle (degrees)")}</Label>
            <Input
              type="number"
              min={-60}
              max={60}
              value={state.skewAngle}
              onChange={(e) => update({ skewAngle: parseFloat(e.target.value) || 0 })}
              placeholder="-15 to +15"
              disabled={disabled}
            />
            {skewError && <p className="text-destructive text-xs mt-1">{skewError}</p>}
          </div>
        </div>
        <div className="bg-muted px-4 py-2 rounded-md flex justify-between text-sm">
          <span className="text-muted-foreground">{t("Overall Bridge Width (m):")}</span>
          <span className="font-mono font-semibold text-info">
            {state.overallBridgeWidth.toFixed(1)} m
          </span>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Additional Geometry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              {t("Overall Bridge Width (m):")} <span className="font-semibold text-foreground">{state.overallBridgeWidth.toFixed(1)} m</span>
            </div>
            <div>
              <Label>{t("Girder Spacing (m)")}</Label>
              <Input
                type="number"
                step="0.1"
                value={tempSpacing}
                onChange={(e) => recalcFromSpacing(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label>{t("No. of Girders")}</Label>
              <Input
                type="number"
                step="1"
                value={tempGirders}
                onChange={(e) => recalcFromGirders(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label>{t("Deck Overhang Width (m)")}</Label>
              <Input
                type="number"
                step="0.1"
                value={tempOverhang}
                onChange={(e) => recalcFromOverhang(parseFloat(e.target.value) || 0)}
              />
            </div>
            {geoError && (
              <p className="text-destructive text-sm font-medium">{geoError}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={applyGeometry} disabled={!!geoError} className="bg-primary text-section-header-foreground">
              {t("Apply")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
