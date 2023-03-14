import { Typography } from '@astral/ui';
import { MenuCloserIcon, MenuOpenIcon } from '@components/common/Icons';
import { TooltipSwitcher } from '@components/common/TooltipSwitcher';

import { StyledSidebarToggler, StyledSidebarTogglerWrapper } from './styles';

interface SidebarTogglerProps {
  toggleHandler: () => void;
  isOpen: boolean;
}

const TITLE_CLOSE_TEXT = 'Свернуть меню';
const TITLE_OPEN_TEXT = 'Развернуть меню';

export const SidebarToggler = ({ toggleHandler, isOpen }: SidebarTogglerProps) => (
  <TooltipSwitcher isActive={!isOpen} title={TITLE_OPEN_TEXT} placement="top-start">
    <StyledSidebarToggler onClick={toggleHandler}>
      {isOpen ? (
        <StyledSidebarTogglerWrapper>
          <MenuCloserIcon height={24} width={24} />
        </StyledSidebarTogglerWrapper>
      ) : (
        <StyledSidebarTogglerWrapper>
          <MenuOpenIcon height={24} width={24} />
        </StyledSidebarTogglerWrapper>
      )}
      {isOpen && (
        <Typography marginLeft={5} overflow="hidden" whiteSpace="nowrap">
          {TITLE_CLOSE_TEXT}
        </Typography>
      )}
    </StyledSidebarToggler>
  </TooltipSwitcher>
);
