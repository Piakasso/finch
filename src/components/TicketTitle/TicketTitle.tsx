import styles from "./TicketTitle.module.css";

const TicketTitle = ({ name }: { name: string }) => {
  return <h2 className={styles.ticketTitle}>{name}</h2>;
};

export default TicketTitle;
