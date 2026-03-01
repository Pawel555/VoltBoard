import { IconButtonStyled } from "./styles";

type IconButtonProps = {
  value: boolean;
  onClick(value: boolean): void;
  icon: React.ReactElement<SVGSVGElement>;
  text?: string;
  useActiveStyle?: boolean;
  className?: string;
};

export function IconButton({
  value,
  onClick,
  icon,
  text,
  useActiveStyle,
  className,
}: IconButtonProps) {
  return (
    <IconButtonStyled
      className={className}
      $active={useActiveStyle ? value : false}
      onClick={() => onClick(!value)}
    >
      {icon}
      {text && <span>{text}</span>}
    </IconButtonStyled>
  );
}
