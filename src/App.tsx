import React, { useState } from 'react';
import { Building2, Calendar, Users, X, ChevronRight, FileText } from 'lucide-react';

// Tipos de datos
interface Convocatoria {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_limite: string;
  cupos: number;
  requisitos: string[];
  area: string;
}

// Datos de ejemplo
const convocatorias: Convocatoria[] = [
  {
    id: 1,
    titulo: "Programa de Formación en Desarrollo Web",
    descripcion: "Curso intensivo de desarrollo web full-stack con enfoque en tecnologías modernas como React, Node.js y bases de datos.",
    fecha_limite: "2024-04-30",
    cupos: 25,
    requisitos: [
      "Mayor de 18 años",
      "Bachiller graduado",
      "Conocimientos básicos de computación",
      "Residente de Galapa"
    ],
    area: "Tecnología"
  },
  {
    id: 2,
    titulo: "Taller de Emprendimiento Local",
    descripcion: "Programa de capacitación para emprendedores locales con mentorías personalizadas y apoyo en la creación de planes de negocio.",
    fecha_limite: "2024-04-15",
    cupos: 30,
    requisitos: [
      "Mayor de 18 años",
      "Residentes de Galapa",
      "Idea de negocio definida",
      "Disponibilidad de tiempo completo"
    ],
    area: "Emprendimiento"
  }
];

function App() {
  const [selectedConvocatoria, setSelectedConvocatoria] = useState<Convocatoria | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (convocatoria: Convocatoria) => {
    setSelectedConvocatoria(convocatoria);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConvocatoria(null);
  };

  const handleInscripcion = (id: number) => {
    alert(`Inscripción enviada para la convocatoria ${id}`);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 size={32} />
              <h1 className="text-3xl font-bold">Alcaldía de Galapa</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Convocatorias Disponibles</h2>
          <p className="text-gray-600 mt-2">Explora las oportunidades disponibles para los ciudadanos de Galapa</p>
        </div>

        {/* Convocatorias Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {convocatorias.map((convocatoria) => (
            <div 
              key={convocatoria.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleOpenModal(convocatoria)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{convocatoria.titulo}</h3>
                <span className="bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
                  {convocatoria.area}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{convocatoria.descripcion}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>Cierre: {convocatoria.fecha_limite}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>{convocatoria.cupos} cupos</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-teal-600 hover:text-teal-700 flex items-center">
                  Ver más <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedConvocatoria && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedConvocatoria.titulo}</h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                  <p className="text-gray-600">{selectedConvocatoria.descripcion}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requisitos</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedConvocatoria.requisitos.map((requisito, index) => (
                      <li key={index}>{requisito}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Fecha límite: {selectedConvocatoria.fecha_limite}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} />
                      <span>{selectedConvocatoria.cupos} cupos disponibles</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleInscripcion(selectedConvocatoria.id)}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center space-x-2"
                  >
                    <FileText size={16} />
                    <span>Inscribirse</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;