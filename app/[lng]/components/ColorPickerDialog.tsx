'use client';

import React, { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import "react-color-palette/css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/[lng]/components/ui/dialogClient';
import { Button } from '@/[lng]/components/ui/sites/buttonSites';
import { useTranslation } from '@/i18n/client';

interface ColorPickerFormProps {
  initialColor?: string;
  onColorChange?: (color: string) => void;
  lng: string;
}

const ColorPickerDialog: React.FC<ColorPickerFormProps> = ({ initialColor = '#ffff', onColorChange, lng }) => {
  const { t } = useTranslation(lng, 'common');
  const [color, setColor] = useColor(initialColor);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleColorChange = (color: any) => {
    setColor(color);
    if (onColorChange) {
      onColorChange(color.hex);
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            style={{ backgroundColor: color.hex }}
            className="w-20 h-10 rounded-md border border-black dark:border-slate-900"
          >
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-text-primary dark:text-dark-text-primary mb-3 sm:mb-6'>
              {t('pick_color')}
            </DialogTitle>
          </DialogHeader>
          <ColorPicker
            height={150}
            color={color}
            hideAlpha={false}
            hideInput={["hsv"]}
            onChange={setColor}
            onChangeComplete={handleColorChange}
          />
          <DialogFooter>
            <button
              className='rounded-xl bg-bg-primary px-5 py-3 text-sm text-text-secondary hover:bg-opacity-95 dark:bg-[#101019] dark:text-dark-text-white hover:dark:bg-dark-secondary'
              onClick={() => setIsDialogOpen(false)}
            >
              {t('btn_accept')}
            </button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ColorPickerDialog;
