import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';

interface TimerProps {
  onComplete: () => void;
  maxTime: number;
}

const Timer: React.FC<TimerProps> = (props: TimerProps) => {

  const { onComplete, maxTime } = props;

  const [timeLeft, setTimeLeft] = useState<number>(maxTime);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [maxTime]);

  useEffect(() => {
    const progressPercent = ((maxTime - timeLeft) / maxTime) * 100;
    setPercent(progressPercent);
  }, [timeLeft, maxTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  return (
    <Progress
      type="circle"
      percent={percent}
      format={() => `${timeLeft}`}
      strokeColor="#BE0000"
      // strokeWidth={10}
      trailColor="#E5E5E5"
      size={30}
    />
  );
};

export default Timer;