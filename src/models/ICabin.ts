export default interface ICabin {
  id: number | undefined;
  name: string;
  description: string;
  image: File;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
}

export type ICabinForm = Omit<ICabin, 'image'> & { image: FileList };
