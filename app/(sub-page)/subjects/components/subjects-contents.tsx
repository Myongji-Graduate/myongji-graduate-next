'use client';
import React from 'react';
import SubjectsFilter from './subjects-filter';
import SubjectsTable from './subjects-table';

export default function SubjectsContents() {
  return (
    <div className="h-50 flex px-3 gap-4 py-5 flex-col">
      <SubjectsFilter />
      <SubjectsTable isAll={false} />
    </div>
  );
}
