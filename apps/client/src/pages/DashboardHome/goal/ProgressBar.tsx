// // ProgressBar.tsx

// import React, { useEffect, useState } from 'react';
// import styles from './progress.module.scss';

// interface ProgressBarProps {
//   percentage: number;
//   className?: string;
//   text?: string;
//   children?: React.ReactNode;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ children, text, percentage, className = '' }) => {
//   const [progress, setProgress] = useState<number>(0);

//   useEffect(() => {
//     if (percentage >= 0 && percentage <= 100) {
//       setProgress(percentage);
//     }
//   }, [percentage]);

//   return (
//     <div className={`progressBar ${className}`}>
//       <div>
//         <div>
//           <div>
//             <span className="label">{text}</span>
//           </div>

//           <div className={`text-right ${className}`}>
//             <span className="percentage">{progress}%</span>
//           </div>
//         </div>
//         <div>{children}</div>
//       </div>
//       <div className={`filler ${className}`}>
//         <div style={{ width: `${progress.toFixed(2)}%` }}></div>
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;
