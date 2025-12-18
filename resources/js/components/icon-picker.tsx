import * as PhosphorIcons from '@phosphor-icons/react';
import React, { useEffect, useRef, useState } from 'react';

type IconName = keyof typeof PhosphorIcons;

const FINANCIAL_ICONS: IconName[] = [
  'Bank',
  'CreditCard',
  'Money',
  'Coins',
  'CurrencyDollar',
  'CurrencyEur',
  'Wallet',
  'Receipt',
  'Invoice',
  'Calculator',
  'ChartDonut',
  'ChartLine',
  'ChartBar',
  'ChartPie',
  'TrendUp',
  'TrendDown',
  'ArrowUp',
  'ArrowDown',
  'Percent',
  'Tag',
  'ShoppingCart',
  'ShoppingBag',
  'Package',
  'Briefcase',
  'Buildings',
  'House',
  'Car',
  'Airplane',
  'Phone',
  'Desktop',
  'Storefront',
  'Gift',
  'Heart',
  'ForkKnife',
  'Coffee',
  'Hamburger',
  'Pizza',
  'AirplaneTilt',
  'Bus',
  'Bicycle',
  'Train',
  'Taxi',
  'GasPump',
  'Lightning',
  'Drop',
  'Fire',
  'Thermometer',
  'Leaf',
  'Tree',
  'FlowerLotus',
  'Sun',
  'Moon',
  'Cloud',
  'Umbrella',
  'Flashlight',
  'Lightbulb',
  'Plug',
  'BatteryCharging',
  'WifiHigh',
  'Globe',
  'MapPin',
  'Factory',
  'Hospital',
  'GraduationCap',
  'Book',
  'Notebook',
  'Article',
  'FileText',
  'FilePlus',
  'FolderOpen',
  'Archive',
  'ClipboardText',
  'Note',
  'Notepad',
  'PencilSimple',
  'Eraser',
  'Scissors',
  'User',
  'Users',
  'UserCircle',
  'IdentificationCard',
  'Handshake',
  'Hand',
  'HandCoins',
  'Suitcase',
  'Lock',
  'LockOpen',
  'Key',
  'Shield',
  'ShieldCheck',
  'Warning',
  'Info',
  'Question',
  'CheckCircle',
  'XCircle',
  'Plus',
  'Minus',
  'X',
  'Check',
  'CaretDown',
  'MagnifyingGlass',
];

interface IconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
  error?: string;
  label?: string;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  name?: string;
  defaultValue?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({
  value: controlledValue,
  onChange,
  error,
  size = 24,
  weight = 'fill',
  name,
  defaultValue = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [internalValue, setInternalValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const filteredIcons = FINANCIAL_ICONS.filter((icon) =>
    icon.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const SelectedIcon =
    value && value in PhosphorIcons
      ? (PhosphorIcons[value as IconName] as React.ComponentType<{
          size?: number;
          weight?: string;
        }>)
      : null;

  const handleSelect = (iconName: IconName) => {
    const newValue = iconName;
    if (controlledValue !== undefined) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
      onChange(newValue);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const CaretDownIcon = PhosphorIcons.CaretDownIcon;
  const MagnifyingGlassIcon = PhosphorIcons.MagnifyingGlassIcon;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {name && <input type="hidden" name={name} value={value} />}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2 transition-colors hover:bg-gray-50 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          {SelectedIcon ? (
            <>
              <SelectedIcon size={size} weight={weight} />
              <span className="text-sm text-gray-700">{value}</span>
            </>
          ) : (
            <span className="text-sm text-gray-400">Select an icon</span>
          )}
        </div>
        <CaretDownIcon
          size={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-96 w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
          <div className="border-b border-gray-200 p-3">
            <div className="relative">
              <MagnifyingGlassIcon
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search icons..."
                className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto p-3">
            {filteredIcons.length > 0 ? (
              <div className="grid grid-cols-6 gap-2">
                {filteredIcons.map((iconName) => {
                  const IconComponent = PhosphorIcons[
                    iconName
                  ] as React.ComponentType<{
                    size?: number;
                    weight?: string;
                  }>;
                  const isSelected = value === iconName;

                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => handleSelect(iconName)}
                      className={`group relative flex items-center justify-center rounded-lg p-3 transition-colors hover:bg-gray-100 ${
                        isSelected ? 'bg-blue-100 ring-2 ring-blue-500' : ''
                      }`}
                      title={iconName}
                    >
                      <IconComponent size={size} weight={weight} />

                      {/* Tooltip */}
                      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {iconName}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400">
                Icons not found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
