import { useBridge } from "@/context/BridgeContext";
import { useTranslation } from "@/context/translations";
import { SectionHeader } from "./SectionHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TypeOfStructure() {
  const { state, update } = useBridge();
  const t = useTranslation(state.language);

  return (
    <div className="border border-border rounded-md">
      <SectionHeader title={t("Type of Structure")} />
      <div className="p-4">
        <Select
          value={state.structureType}
          onValueChange={(v) => update({ structureType: v })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Highway">{t("Highway")}</SelectItem>
            <SelectItem value="Other">{t("Other")}</SelectItem>
          </SelectContent>
        </Select>
        {state.structureType === "Other" && (
          <p className="text-destructive text-sm mt-2 font-medium">
            {t("Other structures not included.")}
          </p>
        )}
      </div>
    </div>
  );
}
