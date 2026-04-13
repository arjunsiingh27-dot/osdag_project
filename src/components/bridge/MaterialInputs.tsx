import { useBridge } from "@/context/BridgeContext";
import { SectionHeader } from "./SectionHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const steelGrades = ["E250", "E350", "E450"];
const deckGrades = ["M25", "M30", "M35", "M40", "M45", "M50", "M55", "M60"];

export function MaterialInputs() {
  const { state, update } = useBridge();
  const disabled = state.structureType === "Other";

  return (
    <div className="border border-border rounded-md">
      <SectionHeader title="Material Inputs" />
      <div className="p-4 space-y-4">
        <div>
          <Label className="text-sm text-muted-foreground">Girder</Label>
          <Select value={state.girderGrade} onValueChange={(v) => update({ girderGrade: v })} disabled={disabled}>
            <SelectTrigger><SelectValue placeholder="Select Grade" /></SelectTrigger>
            <SelectContent>
              {steelGrades.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Cross Bracing</Label>
          <Select value={state.crossBracingGrade} onValueChange={(v) => update({ crossBracingGrade: v })} disabled={disabled}>
            <SelectTrigger><SelectValue placeholder="Select Grade" /></SelectTrigger>
            <SelectContent>
              {steelGrades.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Deck</Label>
          <Select value={state.deckGrade} onValueChange={(v) => update({ deckGrade: v })} disabled={disabled}>
            <SelectTrigger><SelectValue placeholder="Select Grade" /></SelectTrigger>
            <SelectContent>
              {deckGrades.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
