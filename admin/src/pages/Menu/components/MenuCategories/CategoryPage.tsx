import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import { useParams } from 'react-router';

export const CategoryPage = () => {
  const { categoryId } = useParams();
  return (
    <div className="category-page">
      <LayoutWithSearch>
        <>
          <h1 className="category-title">{categoryId}</h1>
        </>
      </LayoutWithSearch>
    </div>
  );
};
