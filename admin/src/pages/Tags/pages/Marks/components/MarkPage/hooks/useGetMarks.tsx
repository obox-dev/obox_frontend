import { useState } from 'react';
import { useRequest } from '@admin/hooks';
import { MarksResponse } from '@shared/services';

// const HARDCODED_RESTAURANT_ID = '793ecd10-c0c0-4b06-ac09-c7a3ecdc9f04';

// interface GetMarksParams {
//   marksId: string;
// }

export const useGetMarks = () => {
  // const restaurantId = HARDCODED_RESTAURANT_ID;
  // const { marksId } = args;
  const [marksList, setMarksList] = useState<MarksResponse[]>([]);

  const { execute: loadAllMarks } = useRequest({
    onSuccess: (result: MarksResponse[]) => {
      setMarksList(result);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });

  return {
    loadAllMarks,
    marksList,
  };
};