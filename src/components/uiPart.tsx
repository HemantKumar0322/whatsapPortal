import { Avatar, Card, Typography } from 'antd';

const { Title } = Typography;

export const PageTitle = (props: any) => {
  const { title } = props;
  return (
    <Title className="!text-[#00192D] !font-semibold" level={4}>{title}</Title>
  )
}

export const PageTitleSecondary = (props: any) => {
  const { title } = props;
  return (
    <Title className="!text-[#00192D] !font-semibold" level={4}>{title}</Title>
  )
}

export const PageTitleWithDescription = (props: any) => {
  const { title, description } = props;
  return (
    <div>
      <Title className="!text-[#00192D] !font-semibold" level={4}>{title}</Title>
      <p className="!text-[#00192D] !font-normal">{description}</p>
    </div>
  )
}

export const SimpleCard = (props: any) => {
  const { children, className = "bg-white", hoverable = false, onClickEvent } = props;
  return (
    <Card
      className={className}
      hoverable={hoverable}
      onClick={() => onClickEvent && onClickEvent()}
    >
      {children}
    </Card>
  )
}

export const TitleCard = (props: any) => {
  const { title, children, className = "bg-white", hoverable = false, onClickEvent } = props;
  return (
    <Card
      title={title}
      className={className}
      hoverable={hoverable}
      onClick={() => onClickEvent && onClickEvent()}
    >
      {children}
    </Card>
  )
}

export const AvatarIconRound = (props: any) => {
  const { size = 'small', src, deffault = "N/A" } = props;
  return (
    <Avatar
      size={size}
      src={src}
      className='bg-green-100 text-black font-semibold'
    >
      {deffault}
    </Avatar>
  )
}

export const AvatarIconSquare = (props: any) => {
  const { size = 'large', src, deffault = "N/A" } = props;
  return (
    <Avatar
      shape="square"
      size={size}
      src={src}
    >
      {deffault}
    </Avatar>)
}

export const IconBox = (props: any) => {
  const { icon, onClickEvent, disabled = false, className = "" } = props;
  return (
    <button
      className={`w-8 h-8 rounded-md flex items-center justify-center bg-gray-100 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'} ${className}`}
      onClick={() => onClickEvent && onClickEvent()}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}

export const IconBoxDynemic = (props: any) => {
  const {
    icon,
    onClickEvent,
    disabled = false,
    className = "",
    bgColor = "bg-gray-100",
    iconColor = "text-gray-700",
    hoverBgColor = "hover:bg-gray-300",
    hoverIconColor = "hover:text-black",
  } = props;
  return (
    <button
      className={`
        w-8 h-8 rounded-md flex items-center justify-center
        ${bgColor}
        ${iconColor}
        ${!disabled ? `${hoverBgColor} ${hoverIconColor}` : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      onClick={() => onClickEvent && onClickEvent()}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}




