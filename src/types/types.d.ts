export interface INumbers {
  firstField: number[];
  secondField: number[];
}

export interface IGameField {
  handleNumberClick: (value, attribute) => void;
  choosenNums: INumbers;
  handleCheckResult: () => void;
}

interface TicketCellProps {
  children: ReactNode;
  handleNumberClick: (value: number, attribute?: string) => void;
  data: string;
  active: boolean;
}

interface TicketDescriptionProps {
  children: ReactNode;
}
