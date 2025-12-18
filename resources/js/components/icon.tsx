import * as Icons from '@phosphor-icons/react';
import React from 'react';

type PhosphorIcon = React.ComponentType<Icons.IconProps>;

interface DynamicIconProps extends Icons.IconProps {
  name: string;
  fallback?: React.ReactNode;
}

const Icon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = (Icons as unknown as Record<string, PhosphorIcon>)[
    name
  ];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
};

export default Icon;
