// Datos de ejemplo

// Función para codificar texto y prevenir XSS
function encodeText(text) {
    if (typeof text !== 'string') {
        console.error('encodeText: Input is not a string', text);
        return '';
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}




const convocatorias = [
    {
        id: 1,
        titulo: "Programa de Emprendimiento Juvenil",
        descripcion: "Iniciativa para jóvenes emprendedores con ideas innovadoras. Financiamiento y asesoría.",
        fecha_limite: "2024-04-30",
        cupos: 25,
        requisitos: [
            "Mayor de 18 años",
            "Residente de Galapa",
            "Idea de negocio definida",
            "Disponibilidad para capacitación"
        ],
        area: "EMPRENDIMIENTO",
        imagen: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        inscripcion_url: "https://ejemplo.com/inscripcion/1"
    },
    {
        id: 2,
        titulo: "Becas Educativas Municipales",
        descripcion: "Programa de becas para estudiantes destacados del municipio. Cubre matrícula y materiales.",
        fecha_limite: "2024-05-15",
        cupos: 30,
        requisitos: [
            "Estudiante activo",
            "Promedio académico superior a 4.0",
            "Residente de Galapa",
            "Situación económica vulnerable"
        ],
        area: "EDUCACIÓN",
        imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        inscripcion_url: "https://ejemplo.com/inscripcion/2"
    },
    {
        id: 3,
        titulo: "Fondos para Proyectos Culturales",
        descripcion: "Financiamiento para iniciativas culturales que promuevan las tradiciones locales y el arte.",
        fecha_limite: "2024-05-20",
        cupos: 15,
        requisitos: [
            "Organización cultural registrada",
            "Proyecto definido",
            "Impacto comunitario demostrable",
            "Presupuesto detallado"
        ],
        area: "CULTURA",
        imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        inscripcion_url: "https://ejemplo.com/inscripcion/3"
    }
];

let convocatoriaSeleccionada = null;
let convocatoriasFiltradas = [...convocatorias];

// Función para crear una tarjeta de convocatoria
// Función para crear una tarjeta de convocatoria
function crearTarjetaConvocatoria(convocatoria) {
    if (!convocatoria || !convocatoria.id) {
        console.error('Error: Convocatoria o ID inválido.', convocatoria);
        return '<div class="convocatoria-card">Error: Datos inválidos</div>';
    }
    try {
         return `
        <div class="convocatoria-card" onclick="abrirModal(${encodeURIComponent(convocatoria.id)})">
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${encodeText(convocatoria.titulo)}</h3>
                    <span class="card-tag">${encodeText(convocatoria.area)}</span>
                </div>
                <p class="card-description">${convocatoria.descripcion}</p>
                <div class="card-info">
                    <div class="info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                            <line x1="16" x2="16" y1="2" y2="6"/>
                            <line x1="8" x2="8" y1="2" y2="6"/>
                            <line x1="3" x2="21" y1="10" y2="10"/>
                        </svg>
                        <span>Cierre: ${convocatoria.fecha_limite}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    } catch (error) {
        console.error("Error al crear la tarjeta de convocatoria:", error);
        return `<div class="convocatoria-card">Error al cargar la convocatoria</div>`;
    }

}

// Función para renderizar todas las convocatorias
function renderizarConvocatorias() {
    const container = document.getElementById('convocatorias-container');
    try{
        container.innerHTML = convocatoriasFiltradas.map(crearTarjetaConvocatoria).join('');
    } catch (error){
         console.error("Error al renderizar las convocatorias:", error);
         container.innerHTML = '<div class="convocatoria-card">Error al cargar las convocatorias</div>';
    }
   
}

// Función para abrir el modal
function abrirModal(id) {
    try {
        const convocatoria = convocatorias.find(c => c.id === Number(id));
        if (!convocatoria) {
             console.error("Error: ID de convocatoria inválido.", id);
             return;
        }
        convocatoriaSeleccionada = convocatoria;
    
        document.getElementById('modal-title').textContent = encodeText(convocatoria.titulo);
        document.getElementById('modal-description').textContent = encodeText(convocatoria.descripcion);
        document.getElementById('modal-fecha').textContent = `Fecha límite: ${encodeText(convocatoria.fecha_limite)}`;
        document.getElementById('modal-cupos').textContent = `${encodeText(convocatoria.cupos)} cupos disponibles`;
        document.getElementById('modal-image').src = encodeText(convocatoria.imagen);
        document.getElementById('modal-image').alt = encodeText(convocatoria.titulo);
    
   
    
    const requisitosLista = document.getElementById('modal-requisitos');
    requisitosLista.innerHTML = convocatoria.requisitos
        .map(requisito => `<li>${requisito}</li>`)
        .join('');

    const inscribirseBtn = document.querySelector('.button-primary');
    inscribirseBtn.onclick = () => window.open(convocatoria.inscripcion_url, '_blank');

    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    } catch(error){
         console.error("Error al abrir el modal:", error);
    }
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
    convocatoriaSeleccionada = null;
}

// Función para manejar la inscripción
function inscribirse() {
    try {
        if (convocatoriaSeleccionada) {
             window.open(encodeText(convocatoriaSeleccionada.inscripcion_url), '_blank');
        }
    } catch(error){
        console.error("Error al Inscribirse:", error);
        closeModal();
    }
}

// Función para filtrar convocatorias
function filtrarConvocatorias() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
     const categoria = document.getElementById('category-select').value;
    try{
        convocatoriasFiltradas = convocatorias.filter(convocatoria => {
           const matchSearch = convocatoria.titulo.toLowerCase().includes(searchTerm) ||
                              convocatoria.descripcion.toLowerCase().includes(searchTerm);
           const matchCategoria = categoria === 'TODOS' || convocatoria.area === categoria;
           return matchSearch && matchCategoria;
       });
    } catch (error){
         console.error("Error al filtrar:", error);
        return matchSearch && matchCategoria;
    };

    renderizarConvocatorias();
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    renderizarConvocatorias();

    // Eventos para filtrado
    document.getElementById('search-input').addEventListener('input', filtrarConvocatorias);
    document.getElementById('category-select').addEventListener('change', filtrarConvocatorias);
    document.querySelector('.search-button').addEventListener('click', filtrarConvocatorias);
});

// Cerrar modal al hacer clic fuera de él
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
});