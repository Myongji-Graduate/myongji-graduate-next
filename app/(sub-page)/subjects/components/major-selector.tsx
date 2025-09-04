import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';
import { major } from '@/app/utils/majors/major';

interface MajorSelectorProps {
  majorType: string;
  singleMajor: string;
  major1: string;
  major2: string;
  mainMajor: string;
  subMajor: string;
  onMajorTypeChange: (value: string) => void;
  onSingleMajorChange: (value: string) => void;
  onMajor1Change: (value: string) => void;
  onMajor2Change: (value: string) => void;
  onMainMajorChange: (value: string) => void;
  onSubMajorChange: (value: string) => void;
}

const MajorOptions = () => (
  <>
    {major.map((m) => (
      <SelectItem key={m} placeholder={m} value={m} />
    ))}
  </>
);

export default function MajorSelector({
  majorType,
  singleMajor,
  major1,
  major2,
  mainMajor,
  subMajor,
  onMajorTypeChange,
  onSingleMajorChange,
  onMajor1Change,
  onMajor2Change,
  onMainMajorChange,
  onSubMajorChange,
}: MajorSelectorProps) {
  return (
    <div className="flex gap-2">
      <div className="md:w-80 w-60">
        <SelectRoot onValueChange={(value) => onMajorTypeChange(value as string)} placeholder={majorType} required>
          <SelectItem placeholder="단일 전공" value="단일 전공" />
          <SelectItem placeholder="복수 전공" value="복수 전공" />
          <SelectItem placeholder="부전공" value="부전공" />
        </SelectRoot>
      </div>

      {majorType === '단일 전공' && (
        <SelectRoot
          onValueChange={(value) => onSingleMajorChange(value as string)}
          placeholder={singleMajor}
          defaultValue={singleMajor}
          className="w-40"
          required
        >
          <MajorOptions />
        </SelectRoot>
      )}

      {majorType === '복수 전공' && (
        <>
          <SelectRoot
            placeholder={major1}
            defaultValue={major1}
            onValueChange={(value) => onMajor1Change(value as string)}
            className="w-40"
            required
          >
            <MajorOptions />
          </SelectRoot>
          <SelectRoot
            placeholder={major2}
            defaultValue={major2}
            onValueChange={(value) => onMajor2Change(value as string)}
            className="w-40"
            required
          >
            <MajorOptions />
          </SelectRoot>
        </>
      )}

      {majorType === '부전공' && (
        <>
          <SelectRoot
            placeholder={mainMajor}
            defaultValue={mainMajor}
            onValueChange={(value) => onMainMajorChange(value as string)}
            className="w-40"
            required
          >
            <MajorOptions />
          </SelectRoot>
          <SelectRoot
            placeholder={subMajor}
            defaultValue={subMajor}
            onValueChange={(value) => onSubMajorChange(value as string)}
            className="w-40"
            required
          >
            <MajorOptions />
          </SelectRoot>
        </>
      )}
    </div>
  );
}
