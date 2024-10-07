export interface TemplatesResponse {
  activate: boolean;
  status: boolean;
  envIds: number[] | undefined;
  action: Action;
  content: string;
  name: string;
  TemplatesPaginated: TemplatesPaginated;
  total: number;
}

// Interfaz para los datos de plantillas paginadas
export interface TemplatesPaginated {
  data: TemplateDatum[];
  filteredTotal: number;
  templatesPerPage: number;
  totalPages: number;
}

// Interfaz de datos individuales de la plantilla
export interface TemplateDatum {
  id: number;
  name: string;
  content: string;
  action: Action;
  templateEnvs: TemplateEnv[];
  status: boolean;
  activate: boolean;
  createdAt: Date;
  updateAt: Date;
}

// Interfaz de acción
export interface Action {
  id: number;
  name: string;
}

// Interfaz para las variables de entorno asociadas
export interface TemplateEnv {
  id: number;
  name: string;
  key: string;
}
