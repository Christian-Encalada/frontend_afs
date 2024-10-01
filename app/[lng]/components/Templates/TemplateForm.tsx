import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getAllActions } from '../../services/actionService';
import { getAllTemplateEnvs } from '../../services/templateEnvService';
import RichTextEditor from './RichTextEditor';
import { IFormCreateTemplate } from '@/types/forms';
import { useTranslation } from '@/i18n/client';
import SelectDropdown from './TemplateSelectDropdown';
import { FIELDS_TEMPLATE } from '@/utils/constants';

export default function TemplateForm({
  onSubmit,
  defaultValues,
  lng,
}: {
  onSubmit: (data: IFormCreateTemplate, resetForm: () => void) => void;
  defaultValues?: Partial<IFormCreateTemplate>;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'templates');
  const [actions, setActions] = useState<{ id: number; name: string }[]>([]);
  const [variables, setVariables] = useState<{ id: number; name: string }[]>([]);
  const [templateEnvIds, setTemplateEnvIds] = useState<number[]>(defaultValues?.templateEnvIds || []);
  
  // Inicializamos los valores iniciales, incluyendo action
  const [selectedAction, setSelectedAction] = useState<number | undefined>(defaultValues?.action || undefined);
  const [content, setContent] = useState<string>(defaultValues?.content || '');
  const [selectedStatus, setSelectedStatus] = useState<boolean>(defaultValues?.status ?? true);
  const [selectedActivate, setSelectedActivate] = useState<boolean>(defaultValues?.activate ?? true);

  const statusOptions = [
    { id: true, name: t('active') },
    { id: false, name: t('inactive') },
  ];

  const activateOptions = [
    { id: true, name: t('activated') },
    { id: false, name: t('deactivated') },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormCreateTemplate>({
    defaultValues,
  });

  // Aquí vemos los valores que cambian en el campo action
  const watchedAction = watch('action', selectedAction);

  // Función para obtener las acciones
  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await getAllActions();
        setActions(response.TemplateActionsPaginated?.data || []);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };

    fetchActions();
  }, []);

  // Lógica para manejar la actualización de los valores cuando cambian los defaultValues
  useEffect(() => {
    if (defaultValues) {
      // Reseteamos los valores del formulario
      reset({
        ...defaultValues,
        action: defaultValues.action || undefined,
      });

      // Actualizamos los estados locales
      setContent(defaultValues.content || '');
      setSelectedAction(defaultValues.action || undefined);
      setSelectedStatus(defaultValues.status ?? true);
      setSelectedActivate(defaultValues.activate ?? true);
    } else {
      // Si no hay valores por defecto, inicializamos con valores vacíos
      reset({
        name: '',
        content: '',
        action: undefined,
        templateEnvIds: [],
        status: true,
        activate: true,
      });
      setContent('');
      setSelectedAction(undefined);
      setSelectedStatus(true);
      setSelectedActivate(true);
      setTemplateEnvIds([]);
    }
  }, [defaultValues, reset]);

  const handleAddVariableId = (variableId: number) => {
    setTemplateEnvIds((prevIds) => [...prevIds, variableId]);
  };

  const onSubmitForm = handleSubmit((data) => {
    onSubmit(
      {
        ...data,
        action: selectedAction !== undefined ? Number(selectedAction) : 0,
        content,
        templateEnvIds,
        status: selectedStatus,
        activate: selectedActivate,
      },
      reset
    );
  });

  return (
    <form id="form" className="grid grid-cols-2 gap-6 p-6" onSubmit={onSubmitForm}>
      {/* Primera fila: 'name' y 'action' */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {FIELDS_TEMPLATE.includes('name') && (
          <div>
            <label className="block mb-2">{t('name')}</label>
            <input
              type="text"
              {...register('name')}
              className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-sm dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-700"
            />
            {errors.name && <p className="text-xs text-red-500 mt-2">{errors.name.message}</p>}
          </div>
        )}
        {FIELDS_TEMPLATE.includes('action') && (
          <div>
            <label className="block mb-2">{t('action')}</label>
            <SelectDropdown
              items={actions}
              fieldName="action"
              register={register}
              lng={lng}
              placeholder={t('select_action')}
              selectedValue={selectedAction ?? ''}  // Aseguramos que el valor seleccionado se refleje
              onValueChange={(val: string | number) => setSelectedAction(Number(val))}  // Convertimos el valor seleccionado a número
            />
            {errors.action && <p className="text-xs text-red-500 mt-2">{errors.action.message}</p>}
          </div>
        )}
      </div>

      {/* Segunda fila: 'content' */}
      {FIELDS_TEMPLATE.includes('content') && (
        <div className="col-span-2">
          <label className="block mb-2">{t('content')}</label>
          <RichTextEditor value={content} onChange={setContent} addVariableToContent={handleAddVariableId} />
          {errors.content && <p className="text-xs text-red-500 mt-2">{errors.content.message}</p>}
        </div>
      )}

      {/* Tercera fila: 'status' y 'activate' */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {FIELDS_TEMPLATE.includes('status') && (
          <div>
            <label className="block mb-2">{t('status')}</label>
            <SelectDropdown
              items={statusOptions}
              fieldName="status"
              register={register}
              lng={lng}
              placeholder={t('select_status')}
              selectedValue={selectedStatus}
              onValueChange={(val: string | number) => setSelectedStatus(val === 'true')}
            />
            {errors.status && <p className="text-xs text-red-500 mt-2">{errors.status.message}</p>}
          </div>
        )}
        {FIELDS_TEMPLATE.includes('activate') && (
          <div>
            <label className="block mb-2">{t('activate')}</label>
            <SelectDropdown
              items={activateOptions}
              fieldName="activate"
              register={register}
              lng={lng}
              placeholder={t('select_activate')}
              selectedValue={selectedActivate}
              onValueChange={(val: string | number) => setSelectedActivate(val === 'true')}
            />
            {errors.activate && <p className="text-xs text-red-500 mt-2">{errors.activate.message}</p>}
          </div>
        )}
      </div>
    </form>
  );
}
