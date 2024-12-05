
interface ActivityItemProps {
  alt: string;
  time: string;
  description: string;
}

function ActivityItem({ alt, time, description }: ActivityItemProps): JSX.Element {
  return (
    <div className="item">
      <div className="avatar">
        <img alt={alt} src={`/images/${alt}.jpg`}/>
      </div>
      <div className="time">{time}</div>
      <p>{description}</p>
    </div>
  );
}

export default ActivityItem;