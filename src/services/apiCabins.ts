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

export async function createCabin(newCabin: Omit<ICabin, 'id'>) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const imageUrl = `${
    import.meta.env.VITE_API_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;

  const { data: cabin, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imageUrl }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // File uploading to the storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // Delete the cabin if the upload process fails
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', cabin.id);

    console.error(storageError);
    throw new Error('Cabin could not be created due to an upload failure');
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
