import React from 'react'
import SectionHeader from '../common/SectionHeader';
import { FaFileMedical } from 'react-icons/fa';
import { User } from './ProfilePersonalData';

const Prescriptions = ({ user, setUser }: { user: User, setUser: (user: User) => void }) => {
  return (
    <div>
      <SectionHeader
        title="Recetas Médicas"
        description="Aquí aparecerán tus recetas médicas."
        icon={<FaFileMedical />}
        name={user?.name}
        lastName={user?.lastName}
        setUser={setUser}
      />
    </div>
  )
}

export default Prescriptions;