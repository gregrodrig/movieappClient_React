import styles from "./SidebarBody.module.css";

export default function SidebarBody({ contentTop, contenButtom }) {
  return (
    <div className={styles.container}>
      <div className={styles.DataTableCol}>
        <div>{contentTop}</div>
        {contenButtom}
      </div>
    </div>
  );
}
