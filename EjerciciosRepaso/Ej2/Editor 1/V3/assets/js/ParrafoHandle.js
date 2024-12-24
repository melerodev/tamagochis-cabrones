export const ParrafoEditable = {
    init: () => {
        function anadirEditButton() {
            document.querySelectorAll('.parrafoEditable').forEach(parrafo => {
                // elimina cualquier botón de edición existente
                const existingButton = parrafo.querySelector('button');
                if (existingButton) {
                    existingButton.remove();
                }

                // crea y añade el botón de edición
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar'; // texto del botón
                parrafo.appendChild(editButton); // añade el botón al párrafo

                // añade el listener al botón de edición
                editButton.addEventListener('click', (e) => {
                    const parrafo = e.target.parentElement; // obtenemos el párrafo
                    const textarea = document.createElement('textarea'); // creamos un textarea
                    textarea.value = parrafo.textContent; // le asignamos el texto del párrafo

                    const checkButton = document.createElement('button'); // creamos el botón de check
                    checkButton.innerHTML = 'Aceptar'; // le asignamos el icono
                    const cancelButton = document.createElement('button'); // creamos el botón de cancelar
                    cancelButton.innerHTML = 'Cancelar'; // le asignamos el icono

                    const buttonContainer = document.createElement('div'); // creamos un contenedor para los botones
                    buttonContainer.appendChild(checkButton); // añadimos el botón de check
                    buttonContainer.appendChild(cancelButton); // añadimos el botón de cancelar

                    parrafo.replaceWith(textarea); // reemplazamos el párrafo con el textarea
                    textarea.after(buttonContainer); // añadimos el contenedor de botones después del textarea

                    checkButton.addEventListener('click', () => {
                        if (textarea.value === parrafo.textContent) {
                            alert('Error: ¡No has modificado nada!'); // si el texto es igual, mostramos un error
                            return; // si el texto es igual, no hacemos nada
                        };
                        parrafo.textContent = textarea.value; // asignamos el valor del textarea al párrafo
                        textarea.replaceWith(parrafo); // reemplazamos el textarea con el párrafo
                        buttonContainer.remove(); // eliminamos el contenedor de botones
                        anadirEditButton(); // volvemos a añadir el botón de edición
                    });

                    cancelButton.addEventListener('click', () => {
                        textarea.replaceWith(parrafo); // reemplazamos el textarea con el párrafo
                        buttonContainer.remove(); // eliminamos el contenedor de botones
                    });
                });
            });
        }
        anadirEditButton();
    }
}