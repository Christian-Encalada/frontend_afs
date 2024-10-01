export interface TemplatesResponse {
  activate: boolean;
  status: boolean;
  envIds: number[] | undefined;
  actionId: number;
  content: string;
  name: string;
  TemplatesPaginated: TemplatesPaginated;
  total: number; // Número total de plantillas
}

// Interfaz para los datos de plantillas paginadas
export interface TemplatesPaginated {
  data: TemplateDatum[]; // Array de plantillas
  filteredTotal: number; // Número total filtrado
  templatesPerPage: number; // Cantidad de plantillas por página
  totalPages: number; // Total de páginas
}

// Interfaz de datos individuales de la plantilla
export interface TemplateDatum {
  id: number;
  name: string; // Nombre del template
  content: string; // Contenido del template
  action: Action; // Acción relacionada con el template
  templateEnvs: TemplateEnv[]; // Variables de entorno asociadas
  status: boolean; // Estado activo o inactivo
  activate: boolean; // Indica si es el template activo para la acción
  createdAt: Date; // Fecha de creación
  updateAt: Date; // Fecha de actualización
}

// Interfaz de acción
export interface Action {
  id: number;
  name: string;
}

// Interfaz para las variables de entorno asociadas
export interface TemplateEnv {
  id: number;
  name: string; // Nombre de la variable de entorno
  key: string; // Clave de la variable de entorno
}
