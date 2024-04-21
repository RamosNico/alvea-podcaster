interface Props {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: Props) => {
  return (
    <div className={`border border-gray-200 rounded-md shadow ${className}`}>
      {children}
    </div>
  );
};

export default Card;
