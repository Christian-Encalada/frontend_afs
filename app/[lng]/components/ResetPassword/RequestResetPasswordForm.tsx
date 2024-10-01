'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from '@/i18n/client';
import { IFormRequestResetPassword } from '@/types/forms';
import styles from '../../styles/requestPassword.module.css';
import { requestResetPassword } from '../../services/authService';
import { toast } from 'react-toastify';
import SmallLoader from '../SmallLoader';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';

const RequestResetPasswordForm: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation(lng, 'requestResetPassword');
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup.string().email(t('error_invalid_email')).required(t('error_email_required')),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IFormRequestResetPassword>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormRequestResetPassword> = async (data) => {
    try {
      setLoading(true);
      const response = await requestResetPassword({ email: data.email }, lng);
      if (response) {
        setSentEmail(true);
        toast.success(t('reset_request_success'), {
          autoClose: 2800,
        });
      }      
    } catch (error: any) {
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        toast.error(t('error_email_not_found'));
      } else {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      }
      setSentEmail(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col gap-5 rounded-xl bg-text-secondary p-7 text-text-primary shadow-xl'
    >
      <label>{t('email_form')}</label>
      <input type="email" className={`${styles.input}`} 
        {...register('email')}
      />
      {errors.email && (
        <p className='text-red-600 text-xs font-semibold'>
          {errors.email.message}
        </p>
      )}
      { sentEmail ? (
        <div>
          <div className='flex felx-row gap-3 mt-3 rounded-md items-center text-text-primary shadow-md p-4 border-2'>
            <IoMdInformationCircleOutline size={60} />
            <p className='text-xs font-medium text-text-primary gap'>
              {t('email_sent')}
            </p>
          </div>
          <button 
            type="button"
            className='w-full mt-5 rounded-lg bg-bg-primary py-3 text-text-secondary shadow-lg'
            onClick={() => router.push(`/login`)}
          >
            {t('btn_back_login')}
          </button>
        </div>
      ) : (
        <button 
          type="submit"
          className='w-full rounded-lg bg-bg-primary py-3 text-text-secondary shadow-lg'
          disabled={loading}
        >
          {loading ? <SmallLoader /> : t('btn_form')}
        </button>
      )}   
    </form>
  );
};



export default RequestResetPasswordForm;
