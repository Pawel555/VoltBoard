import { IconButtonStyled } from "./styles";

export function IconButton({
  value,
  onClick,
  Icon,
}: {
  value: boolean;
  onClick(value: boolean): void;
  Icon: React.ReactElement<SVGSVGElement>;
}) {
  return (
    <IconButtonStyled $active={value} onClick={() => onClick(!value)}>
      {Icon}
    </IconButtonStyled>
  );
}
