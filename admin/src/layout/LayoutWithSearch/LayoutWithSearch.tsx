import { SearchBar } from '@admin/components/molecules/SearchBar';
import './LayoutWithSearch.scss';

export const LayoutWithSearch = (props: { children: JSX.Element }) => {
  const { children } = props;
  return (
    <div className="layout-with-search min-vh-100">
      <SearchBar />
      {children}
    </div>
  );
};
