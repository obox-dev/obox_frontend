import React from 'react';
import { ISidebarNavigation } from './types';
import Logo from '../../atoms/Logo/Logo';
import Navigation from '../../molecules/Navigation/Navigation';
import { LanguageSwitcher } from '@shared/components/molecules/LanguageSwitcher';
import AuthButtons from '../../molecules/AuthButtons/AuthButtons';
import UserProfile from '../../molecules/UserProfile/UserProfile';
import { Sidebar } from '@admin/layout/Sidebar/Sidebar';
import { ThemeSwitcher } from '@admin/components/atoms/ThemeSwitcher/ThemeSwitcher';
import { RestaurantSelectInput } from '@admin/components/atoms/RestaurantSelectInput/RestaurantSelectInput';

export const SidebarNavigation: React.FC<ISidebarNavigation> = ({
  userIsAuthenticated,
}: ISidebarNavigation) => {
  return (
    <Sidebar>
      <>
        <div className="side-bar__start">
          <Logo />
          <RestaurantSelectInput />
          <Navigation />
        </div>
        <div className="side-bar__end">
          <ThemeSwitcher />
          <LanguageSwitcher />
          {userIsAuthenticated ? <UserProfile /> : <AuthButtons />}
        </div>
      </>
    </Sidebar>
  );
};
