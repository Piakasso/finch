import React from "react";
import styles from "./TicketDescription.module.css";
import { TicketDescriptionProps } from "../../types/types";

const TicketDescription: React.FC<TicketDescriptionProps> = ({ children }) => {
  return <div className={styles.ticketDescr}>{children}</div>;
};

export default TicketDescription;
