import { useState } from 'react';
import { useRequest } from '@admin/hooks';
import { MarksResponse , RestaurantsService , MarksService } from '@shared/services';

interface GetMarksParams {
  restaurant_id: string;
}

export const useGetMarks = (args: GetMarksParams) => {
  const { restaurant_id } = args;

  const [marksList, setMarksList] = useState<MarksResponse[]>([]);

  const loadMarks = () => {
    return RestaurantsService.getMarksByRestaurantId(restaurant_id);
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

  const { execute: loadSingleMarks } = useRequest({
    requestFunction: MarksService.getById,
    redirect404: true,
  });

  return {
    loadSingleMarks,
    loadAllMarks,
    marksList,
  };
};