export default interface ICabin {
  id: number;
  name: string;
  description: string;
  image: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
}
