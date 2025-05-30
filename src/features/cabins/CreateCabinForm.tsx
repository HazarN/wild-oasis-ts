import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { createCabin } from '@services/apiCabins';

import { ICabinForm } from '@models/ICabin';

import Button from '@ui/Button';
import FileInput from '@ui/FileInput';
import Form from '@ui/Form';
import FormRow from '@ui/FormRow';
import Input from '@ui/Input';
import Textarea from '@ui/Textarea';

type Props = {
  cabinToEdit: Partial<ICabinForm>;
};
function CreateCabinForm({ cabinToEdit }: Props) {
  const { id: editId, ...editValues } = getInitialValues(cabinToEdit);
  const isEditSession = !!editId;

  const { register, handleSubmit, reset, getValues, formState } = useForm<ICabinForm>({
    defaultValues: editValues,
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin created successfully');

      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const submitCallback = (data: ICabinForm) => mutate({ ...data, image: data?.image[0] });
  return (
    <Form onSubmit={handleSubmit(submitCallback)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice || 'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isCreating}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variant='secondary' type='reset'>
            Cancel
          </Button>

          <Button disabled={isCreating}>{isEditSession ? 'Edit' : 'Add'} cabin</Button>
        </>
      </FormRow>
    </Form>
  );
}

const getInitialValues = (cabinToEdit: Partial<ICabinForm>): ICabinForm => {
  if (cabinToEdit && 'id' in cabinToEdit) return cabinToEdit as ICabinForm;

  return {
    id: undefined,
    name: '',
    description: '',
    image: {} as FileList,
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
  };
};

export default CreateCabinForm;
