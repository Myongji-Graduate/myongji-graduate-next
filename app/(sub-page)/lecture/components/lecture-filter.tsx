import React, { useState } from 'react';
import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';
import Button from '@/app/ui/view/atom/button/button';
import { RESULT_CATEGORY_KO } from '@/app/utils/key/result-category.key';
import MajorSelector from './major-selector';

function LectureFilter() {
  const [majorType, setMajorType] = useState<string>('단일 전공');
  const [singleMajor, setSingleMajor] = useState<string>('전공명');
  const [firstMajor, setfirstMajor] = useState<string>('전공명1');
  const [secondMajor, setsecondMajor] = useState<string>('전공명2');
  const [mainMajor, setMainMajor] = useState<string>('주전공명');
  const [subMajor, setSubMajor] = useState<string>('부전공명');

  return (
    <div className="flex flex-col gap-2">
      <MajorSelector
        majorType={majorType}
        singleMajor={singleMajor}
        firstMajor={firstMajor}
        secondMajor={secondMajor}
        mainMajor={mainMajor}
        subMajor={subMajor}
        onMajorTypeChange={(value) => setMajorType(value)}
        onSingleMajorChange={(value) => setSingleMajor(value)}
        onFirstMajorChange={(value) => setfirstMajor(value)}
        onSecondMajorChange={(value) => setsecondMajor(value)}
        onMainMajorChange={(value) => setMainMajor(value)}
        onSubMajorChange={(value) => setSubMajor(value)}
      />

      <div className="flex gap-4">
        <SelectRoot placeholder="학번" className="w-40" required>
          {['16', '17', '18', '19', '20', '21', '22', '23', '24'].map((y) => (
            <SelectItem key={y} placeholder={y} value={y} />
          ))}
        </SelectRoot>
        <SelectRoot placeholder="전체" className="w-40">
          <SelectItem placeholder="전체" value="all" />
          {Object.entries(RESULT_CATEGORY_KO).map(([key, value]) => (
            <SelectItem key={key} placeholder={value} value={key} />
          ))}
        </SelectRoot>
      </div>

      <div className="gap-2 justify-between flex pt-2">
        <div className="flex gap-2">
          <Button label="인기순" size="sm" variant="outlined" />
          <Button label="많이 들은 순" size="sm" variant="outlined" />
        </div>
        <Button label="검색" size="sm" variant="primary" />
      </div>
    </div>
  );
}

export default LectureFilter;
