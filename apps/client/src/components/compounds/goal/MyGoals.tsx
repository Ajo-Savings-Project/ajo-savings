
import Travel from './images/travel.svg';
import Home from './images/home.svg';
import Car from './images/car.svg';
import styles from './goal.module.scss';
import { Card, Text } from 'components';

const data = [
  {
    id: '1',
    image: Travel,
    target: 'Travel',
    amountSaved: 5000000,
    targetAmount: 10000000,
  },
  {
    id: '2',
    image: Home,
    target: 'Dream Home',
    amountSaved: 10000000,
    targetAmount: 40000000,
  },
  {
    id: '3',
    image: Car,
    target: 'Dream Car',
    amountSaved: 1000000,
    targetAmount: 5000000,
  },
];

const formatCurrency = (amountSaved: number | bigint) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amountSaved);
};

const calculatePercentage = (amountSaved: number, targetAmount: number) => {
  const parsedAmountSaved = parseFloat(amountSaved.toString().replace('₦', '').replace(',', ''));
  const parsedTargetAmount = parseFloat(targetAmount.toString().replace('₦', '').replace(',', ''));
  return Math.round((parsedAmountSaved / parsedTargetAmount) * 100);
};



const MyGoals = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
         <Text content={'MY GOALS'} size={'Small'} />
         <Text
          content={'View all'}
          size={'Small'}
          style={{ color: 'var(--dashboard-blue1)' }}
        />
      </div>
      {data.map((target, index) => (
        <Card key={index} className={styles.goalSection}>
          <div className={styles.infoSection}>
            <div className={styles.goal}>
              <img className={styles.image} alt="image" src={target.image} />
              <div className={styles.info}>
                <Text size={'Small'} className={styles.target} content={target.target} />
                <div className={styles.amount}>
                  <Text
                    size={'Small'}
                    className={styles.saved}
                    content={formatCurrency(target.amountSaved)}
                  />
                  <Text
                    size={'Small'}
                    className={styles.targetAmount}
                    content={`/${formatCurrency(target.targetAmount)}`}
                  />
                </div>
              </div>
            </div>
            <div className={styles.percentage}>
              {calculatePercentage(target.amountSaved, target.targetAmount)}%
            </div>
          </div>
          <div className={styles.dashedLinesContainer}>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={
                  index < 5 ? styles.dashedLine : styles.dashedLineLeft
                }
              ></div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MyGoals;
