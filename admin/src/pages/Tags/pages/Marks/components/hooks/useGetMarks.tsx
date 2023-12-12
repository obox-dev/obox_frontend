import { useState } from 'react';
import { useRequest } from '@admin/hooks';
import { MarksResponse , MarksService } from '@shared/services';

interface GetMarksParams {
  restaurantId: string;
}

export const useGetMarks = (args: GetMarksParams) => {
  const { restaurantId } = args;

  const [marksList, setMarksList] = useState<MarksResponse[]>([]);

  const loadMarks = () => {
    return MarksService.getMarksByRestaurantId(restaurantId);
  };

  const { execute: loadAllMarks } = useRequest({
    requestFunction: loadMarks,
    onSuccess: (result: MarksResponse[]) => {
      setMarksList(result);
    },
    onError: (error) => {
      console.error('Error fetching marks:', error);
    },
  });

  return {
    loadAllMarks,
    marksList,
  };
};