import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'

type ProfileAppointmentsType = {
    appointments: any;
    setActiveTab: (tab: string) => void;
}

export default function ProfileAppointments({appointments, setActiveTab} : ProfileAppointmentsType) {

    const redirectAppointmentView = () => {
        setActiveTab('make-appointment')
    }

    return (
        <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                Mis Turnos
                </h3>
                <button className="btn btn-primary flex items-center gap-2 bg-sky-500 text-white" onClick={() => redirectAppointmentView()}>
                <FaPlusCircle /> Agendar consulta
                </button>
            </div>

            {/* 📌 Lista de turnos programados en grilla */}
            {appointments.length === 0 ? (
                <p className="text-gray-600 mt-2">No tienes turnos programados.</p>
                ) : (
                    <div className="overflow-x-auto text-gray-600" > 
                        <table className="table">
                            {/* head */}
                            <thead className="bg-blue-400 border">
                                <tr className="text-white">
                                    <th>Profesional</th>
                                    <th>Especialidad</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>
                                    <label>Más opciones</label>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <tr key={`appointment-${appt.doctor.user.email}-${appt.date}`} className='hover:bg-gray-100'>
                                        <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                alt="Avatar del profesional"
                                                />
                                            </div>
                                            </div>
                                            <div>
                                            <div className="font-bold">{appt.doctor.user.name}</div>
                                            <div className="text-sm opacity-50">{appt.doctor.user.email}</div>
                                            </div>
                                        </div>
                                        </td>
                                        <td>
                                        {appt.doctor.specialty[0]}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                        </td>
                                        <td>{new Date(appt.date).toLocaleString()}</td>
                                        <td>Pendiente</td>
                                        <td>
                                        <button className="btn btn-ghost btn-xs">Opciones</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                </div>)}

        </div>
    )
}
