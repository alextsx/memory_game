import Image from 'next/image';

const NonHoveredCardBackSvg = () => {
  return <Image src="/assets/img/back.svg" width={81} height={130} alt="Non hovered card's back" />;
};

const HoveredCardBackSvg = () => {
  return (
    <Image
      src="/assets/img/back_hovered.svg"
      width={81}
      height={130}
      alt="Non hovered card's back"
    />
  );
};

export const CardBack = ({ isHovered }: { isHovered: boolean }) => {
  return <>{isHovered ? <HoveredCardBackSvg /> : <NonHoveredCardBackSvg />}</>;
};
