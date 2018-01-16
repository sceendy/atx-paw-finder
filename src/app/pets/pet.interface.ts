export interface Pet {
  age: string,
  animal_id: string;
  color: string,
  intake_date: string;
  type: string;
  location: {
    latitude: string,
    longitude: string,
    human_address: string // api sends it as string, should be object though
  };
  show: boolean;
}