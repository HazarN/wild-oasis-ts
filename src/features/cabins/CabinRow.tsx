import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { deleteCabinById } from '@services/apiCabins';

import { formatCurrency } from '@utils/helpers';

import { ICabinForm } from '@models/ICabin';
import Button from '@ui/Button';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

type Props = {
  cabin: ICabinForm;
};
function CabinRow({ cabin }: Props) {
  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();
  const { id: cabinId, image, discount, maxCapacity, regularPrice, name } = cabin;

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id: number) => deleteCabinById(id),
    onSuccess: () => {
      toast.success('Cabin successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <>
      <TableRow role='row'>
        <Img src={image as unknown as string} alt='Cabin image' />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>

        <div>
          <Button variant='secondary' size='small' onClick={() => setShowForm((s) => !s)}>
            Edit
          </Button>

          <Button
            variant='secondary'
            size='small'
            onClick={() => mutate(cabinId as number)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </div>
      </TableRow>

      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
