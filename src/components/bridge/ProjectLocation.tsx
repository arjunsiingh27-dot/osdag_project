import { useBridge } from "@/context/BridgeContext";
import { useTranslation } from "@/context/translations";
import { SectionHeader } from "./SectionHeader";
import { Checkbox } from "@/components/ui/checkbox";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { states, getDistricts, getLocationData } from "@/data/locationData";

export function ProjectLocation() {
  const { state, update } = useBridge();
  const t = useTranslation(state.language);
  const districts = getDistricts(state.state);
  const locData = getLocationData(state.state, state.district);
  const disabled = state.structureType === "Other";

  return (
    <div className="border border-border rounded-md">
      <SectionHeader title={t("Project Location")} />
      <div className="p-4 space-y-4">
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={state.locationMode === "enter"}
              onCheckedChange={() => update({ locationMode: "enter" })}
              disabled={disabled}
            />
            {t("Enter Location Name")}
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={state.locationMode === "custom"}
              onCheckedChange={() => update({ locationMode: "custom" })}
              disabled={disabled}
            />
            {t("Tabulate Custom Loading Parameters")}
          </label>
        </div>

        {state.locationMode === "enter" && !disabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">{t("State")}</Label>
              <Select
                value={state.state}
                onValueChange={(v) => update({ state: v, district: "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("Select State")} />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">{t("District")}</Label>
              <Select
                value={state.district}
                onValueChange={(v) => update({ district: v })}
                disabled={!state.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("Select District")} />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {state.locationMode === "enter" && locData && (
          <div className="grid grid-cols-2 gap-2 text-sm text-info font-medium bg-accent p-3 rounded-md">
            <span>Wind Speed: {locData.windSpeed} m/s</span>
            <span>Seismic Zone: {locData.seismicZone} (Z={locData.zoneFactor})</span>
            <span>Max Temp: {locData.tempMax}°C</span>
            <span>Min Temp: {locData.tempMin}°C</span>
          </div>
        )}

        {state.locationMode === "custom" && !disabled && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-primary text-primary hover:bg-accent">
                Open Custom Parameters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Custom Loading Parameters</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Basic Wind Speed (m/s)</Label>
                  <Input
                    type="number"
                    value={state.customWind}
                    onChange={(e) => update({ customWind: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Seismic Zone Factor</Label>
                  <Input
                    type="text"
                    value={state.customSeismic}
                    onChange={(e) => update({ customSeismic: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Max Shade Air Temp (°C)</Label>
                  <Input
                    type="number"
                    value={state.customTempMax}
                    onChange={(e) => update({ customTempMax: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Min Shade Air Temp (°C)</Label>
                  <Input
                    type="number"
                    value={state.customTempMin}
                    onChange={(e) => update({ customTempMin: e.target.value })}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {state.locationMode === "custom" && state.customWind && (
          <div className="grid grid-cols-2 gap-2 text-sm text-info font-medium bg-accent p-3 rounded-md">
            <span>Wind Speed: {state.customWind} m/s</span>
            <span>Seismic: {state.customSeismic}</span>
            <span>Max Temp: {state.customTempMax}°C</span>
            <span>Min Temp: {state.customTempMin}°C</span>
          </div>
        )}
      </div>
    </div>
  );
}
