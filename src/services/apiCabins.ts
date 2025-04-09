import supabase from '@services/supabase';

// FIXME: Implement a cabin entity(interface)
export async function getCabins(): Promise<any> {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    return;
  }

  return cabins;
}
