import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Statistic from './Statistic';
import Notification from './Notification';
export function App() {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const onLeaveFeedback = event => {
    const { name } = event.target;
    switch (name) {
      case 'good':
        setGood(prevState=> prevState+1);
        break;
      case 'neutral':
        setNeutral(prevState=> prevState+1);
        break;
      case 'bad':
        setBad(prevState=> prevState+1);
        break;
      default:
        return;
    }
  };
  const countTotalFeedback = () => {
    const total = good + neutral + bad;
    return total;
  };
  const countPositiveFeedbackPercentage = () => {
    const positive = Math.round((good * 100) / (good + neutral + bad));
    return positive;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title={'Пожалуйста оставьте обратную связь'}>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title={'Статистика'}>
        {total ? (
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification
            message={'Для просмотра статистики надо нажать на одну из кнопок'}
          />
        )}
      </Section>
    </>
  );
}
