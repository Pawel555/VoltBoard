import { IconButtonStyled } from "./styles";

type IconButtonProps = {
  value: boolean;
  onClick(value: boolean): void;
  Icon: React.ReactElement<SVGSVGElement>;
  text?: string;
  useActiveStyle?: boolean;
};

export function IconButton({
  value,
  onClick,
  Icon,
  text,
  useActiveStyle,
}: IconButtonProps) {
  return (
    <IconButtonStyled
      $active={useActiveStyle ? value : false}
      onClick={() => onClick(!value)}
    >
      {Icon}
      {text && <span>{text}</span>}
    </IconButtonStyled>
  );
}
