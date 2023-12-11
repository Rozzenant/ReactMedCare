import React, { useState } from 'react';
import { ProcedureInter } from '../../Models/procedure.tsx';

interface FilterProps {
  procedures: ProcedureInter[];
  onFilterChange: (filteredProcedures: ProcedureInter[]) => void;
}

const ProcedureFilter: React.FC<FilterProps> = ({ procedures, onFilterChange }) => {
  const [filter, setFilter] = useState<string>('');

  const Filter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  React.useEffect(() => {
    const filteredProcedures = procedures.filter((procedure) =>
      procedure.Procedure_Name.toLowerCase().includes(filter.toLowerCase())
    );
    onFilterChange(filteredProcedures);
  }, [filter, procedures, onFilterChange]);

  return (
    <div style={{display: "flex", justifyContent: "center"}} className='bg-body'>
      <input type="text" placeholder="Поиск по названию" value={filter} onChange={Filter} />
    </div>
  );
};

export default ProcedureFilter;