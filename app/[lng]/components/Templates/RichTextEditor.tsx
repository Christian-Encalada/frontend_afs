'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { getAllTemplateEnvs } from '../../services/templateEnvService';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) {
  const [variables, setVariables] = useState<{ id: number, name: string }[]>([]);
  const [selectedVariable, setSelectedVariable] = useState('');

  useEffect(() => {
    const fetchTemplateEnvs = async () => {
      try {
        const response = await getAllTemplateEnvs();
        const formattedVariables = response.TemplateEnvsPaginated?.data.map((env: { id: number, env: string }) => ({
          id: env.id,
          name: env.env,
        }));
        setVariables(formattedVariables || []);
      } catch (error) {
        console.error('Error fetching variables:', error);
      }
    };

    fetchTemplateEnvs();
  }, []);

  const handleInsertVariable = () => {
    if (selectedVariable) {
      // Actualiza sin añadir un salto de línea o espacio adicional
      onChange(`${value}${selectedVariable}`); 
      setSelectedVariable('');
    }
  };
  return (
    <div>
      <ReactQuill value={value} onChange={onChange} theme="snow" />
      
      <div className="mt-2 flex gap-2 items-center">
        {/* Select dinámico que se llena con las variables cargadas */}
        <select
          className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-sm dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-700"
          onChange={(e) => setSelectedVariable(e.target.value)}
          value={selectedVariable}
        >
          <option value="">Seleccionar variable</option>
          {variables.map((variable) => (
            <option key={variable.id} value={variable.name}>
              {variable.name}
            </option>
          ))}
        </select>

        {/* Botón para agregar la variable seleccionada al contenido */}
        <button
          type="button"
          onClick={handleInsertVariable}
          className="rounded-lg bg-indigo-400 text-white px-4 py-2 hover:bg-indigo-500 dark:bg-gray-600 dark:hover:bg-gray-700"
        >
          Añadir al contenido
        </button>
      </div>
    </div>
  );
}
