import React from 'react'
import SectionHeader from '../common/SectionHeader';
import { FaFileMedical } from 'react-icons/fa';

const Prescriptions = () => {
  return (
    <div>
      <SectionHeader
        title="Recetas Médicas"
        description="Aquí aparecerán tus recetas médicas."
        icon={<FaFileMedical />}
      />
    </div>
  )
}

export default Prescriptions;