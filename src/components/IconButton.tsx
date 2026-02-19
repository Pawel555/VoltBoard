import { IconButtonStyled } from "./styles";

type IconButtonProps = {
  value: boolean;
  onClick(value: boolean): void;
  Icon: React.ReactElement<SVGSVGElement>;
  text?: string;
  useActiveStyle?: boolean;
  className?: string;
};

export function IconButton({
  value,
  onClick,
  Icon,
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
      {Icon}
      {text && <span>{text}</span>}
    </IconButtonStyled>
  );
}
