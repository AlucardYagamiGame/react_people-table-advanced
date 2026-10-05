import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../types';

export const useSortedPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const sortField = searchParams.get('sort') as keyof Person | null;
    const isDescending = searchParams.get('order') === 'desc';

    if (!sortField) {
      return people;
    }

    return [...people].sort((firstPerson, secondPerson) => {
      const firstValue = firstPerson[sortField] ?? '';
      const secondValue = secondPerson[sortField] ?? '';

      if (firstValue > secondValue) {
        return isDescending ? -1 : 1;
      }

      if (firstValue < secondValue) {
        return isDescending ? 1 : -1;
      }

      return 0;
    });
  }, [people, searchParams]);
};
