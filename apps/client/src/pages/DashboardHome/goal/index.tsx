
import { Link } from "react-router-dom";
import Travel from "./images/travel.svg";
import Home from "./images/home.svg";
import Car from "./images/car.svg"
import styles from "./goal.module.scss"
import { Card, Text } from "components";



export const data = [
  {
    id: "1",
    image: Travel,
    target: "Travel",
    amount_saved: "₦ 5,000,000.00",
    target_amount: "₦ 10,000,000.00",
  },
  {
    id: "2",
    image: Home,
    target: "Dream Home",
    amount_saved: "₦ 10,000,000.00",
    target_amount: "₦ 40,000,000.00",
  },
  {
    id: "3",
    image: Car,
    target: "Dream Car",
    amount_saved: "₦ 1,000,000.00",
    target_amount: "₦ 5,000,000.00",
  },
];

const MyGoals = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.headerText}>MY GOALS</span>
        <Link to="/dashboard/savings" className={styles.view}>
          View all
        </Link>
      </div>
      {data.map((target, index) => (
        <Card key={index} className={styles.goalSection}>
          <div className={styles.infoSection}>
          <div className={styles.goal}>
            <img className={styles.image} alt="image" src={target.image} />
            <div className={styles.info}>
              <Text size={'Small'} className={styles.target} content={target.target}  />
              <div className={styles.amount}>
              <Text size={'Small'} className={styles.saved} content={target.amount_saved} />
              <Text size={'Small'} className={styles.targetAmount} content={`/ ${target.target_amount}`} />
            </div>
            </div>
          </div>
          <div className={styles.percentage_text}>
           {Math.round((parseFloat(target.amount_saved.replace("₦", "").replace(",", "")) / parseFloat(target.target_amount.replace("₦", "").replace(",", ""))) * 100)}%
          </div>  
          </div>
          <div className={styles.dash}></div>
          {/* <div className="progress-bar-container">
            <ProgressBar 
            className={styles.progressBar} 
            
            // percentage={((target.amount_saved / target.target_amount) * 100)} 
            />
          </div>  */}
        </Card>
      ))}
    </div>
  );
};

export default MyGoals;
