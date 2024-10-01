'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { getAllTemplateEnvs } from '../../services/templateEnvService'; // Asegúrate de tener este servicio para obtener las variables de entorno

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function RichTextEditor({
  value,
  onChange,
  addVariableToContent, // Nuevo prop para agregar variable al contenido
}: {
  value: string;
  onChange: (content: string) => void;
  addVariableToContent: (variableId: number) => void; // Nueva función que pasará el ID de la variable al formulario
}) {
  const [variables, setVariables] = useState<{ id: number, name: string }[]>([]);
  const [selectedVariable, setSelectedVariable] = useState('');

  // Cargar las variables de entorno desde la API
  useEffect(() => {
    const fetchTemplateEnvs = async () => {
      try {
        const response = await getAllTemplateEnvs(); // Asume que esto devuelve las variables de entorno
        const formattedVariables = response.TemplateEnvsPaginated?.data.map((env: { id: number, env: string }) => ({
          id: env.id,
          name: env.env,
        }));
        setVariables(formattedVariables || []); // Guardamos las variables en el estado
      } catch (error) {
        console.error('Error fetching variables:', error);
      }
    };

    fetchTemplateEnvs(); // Ejecuta la función de carga al montar el componente
  }, []);

  // Función para insertar la variable seleccionada en el contenido
  const handleInsertVariable = () => {
    if (selectedVariable) {
      const selectedVariableObject = variables.find(
        (variable) => variable.name === selectedVariable
      );
      if (selectedVariableObject) {
        onChange(`${value} ${selectedVariable}`); // Agrega la variable al contenido con corchetes simples
        addVariableToContent(selectedVariableObject.id); // Llama a la función para agregar el ID de la variable
        setSelectedVariable(''); // Limpia el selector
      }
    }
  };

    // Este log nos ayudará a verificar si el contenido se actualiza correctamente
    useEffect(() => {
      console.log('Content in RichTextEditor:', value);
    }, [value]);
    
  return (
    <div>
      <ReactQuill value={value} onChange={onChange} theme='snow' />
      
      <div className="mt-2 flex gap-2 items-center">
        {/* Select dinámico que se llena con las variables cargadas */}
        <select
          className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-sm dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-700"
          onChange={(e) => setSelectedVariable(e.target.value)}
          value={selectedVariable}
        >
          <option value="">{`Seleccionar variable`}</option>
          {variables.map((variable) => (
            <option key={variable.id} value={variable.name}>
              {variable.name}
            </option>
          ))}
        </select>

        {/* Botón para agregar la variable seleccionada al contenido */}
        <button
          type="button" // Cambia el tipo para evitar el envío del formulario
          onClick={handleInsertVariable}
          className='className="rounded-lg bg-indigo-400 text-white px-4 py-2 hover:bg-indigo-500 dark:bg-gray-600 dark:hover:bg-gray-700'
        >
          Añadir al contenido
        </button>
      </div>
    </div>
  );
}
