import supabase from '@services/supabase';

import ICabin from '@modesl/ICabin';

export async function getCabins(): Promise<ICabin[] | null> {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    return null;
  }

  return cabins as ICabin[];
}
