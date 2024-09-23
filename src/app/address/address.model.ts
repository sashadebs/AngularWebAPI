export class Address {
  public id: number;

  constructor(
    public country: string,
    public city: string,
    public street: string,
    public phone: string
  ) {}
}
