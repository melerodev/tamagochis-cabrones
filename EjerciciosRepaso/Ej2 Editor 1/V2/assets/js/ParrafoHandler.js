export const ParrafoEditable = {
    init: () => {
        function anadirEditButton() {
            document.querySelectorAll('.parrafoEditable').forEach(parrafo => {
                // elimina cualquier botón de edición existente
                const botonExistente = parrafo.querySelector('button');
                if (botonExistente) {
                    botonExistente.remove();
                }
        
                // crea y añade el botón de edición
                const botonEditar = document.createElement('button');
                botonEditar.textContent = 'Editar'; // texto del botón
                parrafo.appendChild(botonEditar); // añade el botón al párrafo
        
                // añade el listener al botón de edición
                botonEditar.addEventListener('click', (e) => {
                    const parrafo = e.target.parentElement; // obtenemos el párrafo
                    const textarea = document.createElement('textarea'); // creamos un textarea
                    textarea.value = parrafo.textContent; // le asignamos el texto del párrafo
        
                    const botonCheck = document.createElement('button'); // creamos el botón de check
                    botonCheck.innerHTML = 'Aceptar'; // le asignamos el icono
                    const botonCancelar = document.createElement('button'); // creamos el botón de cancelar
                    botonCancelar.innerHTML = 'Cancelar'; // le asignamos el icono
        
                    const contenedorBoton = document.createElement('div'); // creamos un contenedor para los botones
                    contenedorBoton.appendChild(botonCheck); // añadimos el botón de check
                    contenedorBoton.appendChild(botonCancelar); // añadimos el botón de cancelar
        
                    parrafo.replaceWith(textarea); // reemplazamos el párrafo con el textarea
                    textarea.after(contenedorBoton); // añadimos el contenedor de botones después del textarea
        
                    botonCheck.addEventListener('click', () => {
                        parrafo.textContent = textarea.value; // asignamos el valor del textarea al párrafo
                        textarea.replaceWith(parrafo); // reemplazamos el textarea con el párrafo
                        contenedorBoton.remove(); // eliminamos el contenedor de botones
                        anadirEditButton(); // volvemos a añadir el botón de edición
                    });
        
                    botonCancelar.addEventListener('click', () => {
                        textarea.replaceWith(parrafo); // reemplazamos el textarea con el párrafo
                        contenedorBoton.remove(); // eliminamos el contenedor de botones
                    });
                });
            });
        }
        anadirEditButton();
    }
}