import supabase from '@services/supabase';

import ICabin from '@models/ICabin';

export async function getCabins(): Promise<ICabin[] | null> {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins as ICabin[];
}

export async function createCabin(newCabin: Partial<ICabin>) {
  const { data: cabin, error } = await supabase.from('cabins').insert([newCabin]);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  return cabin;
}

export async function deleteCabinById(id: number) {
  const { data: cabin, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return cabin as ICabin | null;
}
