
export class FormatterOptions {
  cardType?: string;
  inputType: string;
  selector: string;
}

export class ValidityOptions {
  card?: {
    niceType: string,
    type: 'visa'|'discover'|'american-express'|'amex',
    gaps: number[],
    lengths: number[],
    code: { name: string, size: number}
  };
  isPotentiallyValid: boolean;
  isValid: boolean
}
