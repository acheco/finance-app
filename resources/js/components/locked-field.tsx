import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LockIcon } from '@phosphor-icons/react';

export default function LockedField() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Locked record information"
        >
          <LockIcon weight="fill" size={16} className="text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>System records cannot be edited or deleted.</p>
      </TooltipContent>
    </Tooltip>
  );
}
