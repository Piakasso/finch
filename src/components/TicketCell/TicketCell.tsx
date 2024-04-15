import React from "react";
import styles from "./TicketCell.module.css";
import { TicketCellProps } from "../../types/types";

const TicketCell: React.FC<TicketCellProps> = ({
  children,
  handleNumberClick,
  data,
  active,
}) => {
  return (
    <button
      data-field={data}
      value={children}
      className={`${styles.gameCell} ${active ? styles.activeCell : ""}`}
      onClick={(e) =>
        handleNumberClick(
          Number((e.target as HTMLButtonElement).value),
          e.currentTarget.getAttribute("data-field") || ""
        )
      }
    >
      {children}
    </button>
  );
};

export default TicketCell;
