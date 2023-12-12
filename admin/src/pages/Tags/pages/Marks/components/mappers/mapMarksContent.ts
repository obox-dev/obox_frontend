import { Marks, MarksResponse } from '@shared/services';

export const mapMarksContent = (
  markItem: MarksResponse,
  language: string
): Marks => {
  const { content, ...mark } = markItem;

  return {
    ...content[language],
    ...mark,
  };
};