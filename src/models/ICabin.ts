export default interface ICabin {
  id: number;
  name: string;
  description: string;
  image: File;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
}

export type ICabinForm = Omit<ICabin, 'id' | 'image'> & { image: FileList };
