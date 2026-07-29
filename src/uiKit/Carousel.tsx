import { useEffect, useMemo, useRef, useState, type FC } from 'react';
import { Empty, Flex, Carousel as AntCarousel } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';
import { LeftArrowIcon, RightArrowIcon } from '@/assets';

const THUMB_IMAGE_WIDTH = 97;

type ImageItem = {
  id: string | number;
  src: string;
  alt?: string;
};

export type CarouselProps = {
  images: ImageItem[] | undefined;
};

export const Carousel: FC<CarouselProps> = ({ images }) => {
  return (
    <StyledCarousel
      arrows
      dots={false}>
      {images?.map((image, idx) => (
        <div>
          <img
            style={{ width: '70%', margin: '0 auto' }}
            src={image.src}
            alt={image.alt || `Изображение ${idx + 1}`}
          />
        </div>
      ))}
    </StyledCarousel>
  );
};

export const CarouselWithPreview: FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsViewportRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const safeImages = useMemo(() => images ?? [], [images]);

  const currentImage = safeImages[activeIndex];

  const scrollThumbs = (direction: 'left' | 'right') => {
    const container = thumbsViewportRef.current;
    if (!container) return;

    const scrollAmount = THUMB_IMAGE_WIDTH;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const selectImage = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const activeThumb = thumbRefs.current[activeIndex];
    if (!activeThumb) return;

    activeThumb.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeIndex]);

  if (!safeImages.length) {
    return <Empty description='Нет изображений' />;
  }

  return (
    <Flex
      vertical
      gap='middle'>
      <MainImage
        src={currentImage.src}
        alt={currentImage.alt || `Изображение ${activeIndex + 1}`}
      />

      <Flex
        align='center'
        gap='small'>
        <NavButton
          type='button'
          onClick={() => scrollThumbs('left')}
          aria-label='Прокрутить миниатюры влево'>
          <LeftArrowIcon />
        </NavButton>

        <CarouselViewport ref={thumbsViewportRef}>
          <CarouselTrack>
            {safeImages.map((image, index) => (
              <ThumbButton
                key={image.id}
                ref={(el) => {
                  thumbRefs.current[index] = el;
                }}
                type='button'
                active={index === activeIndex}
                onClick={() => selectImage(index)}
                aria-label={`Открыть изображение ${index + 1}`}>
                <ThumbImage
                  src={image.src}
                  alt={image.alt || `Миниатюра ${index + 1}`}
                />
              </ThumbButton>
            ))}
          </CarouselTrack>
        </CarouselViewport>

        <NavButton
          type='button'
          onClick={() => scrollThumbs('right')}
          aria-label='Прокрутить миниатюры вправо'>
          <RightArrowIcon />
        </NavButton>
      </Flex>
    </Flex>
  );
};

const StyledCarousel = styled(AntCarousel)`
  padding: 0;

  & .slick-arrow {
    color: ${theme.colors.accentPrimary};
  }
`;

const MainImage = styled.img`
  width: 100%;
  max-height: 460px;
  object-fit: contain;
`;

const NavButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: 0.2s;

  &:hover svg {
    stroke: ${theme.colors.accentPrimary};
  }
`;

const CarouselViewport = styled.div`
  flex: 1;
  overflow: hidden;
  min-width: 0;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  width: max-content;
`;

const ThumbButton = styled.button<{ active: boolean }>`
  padding: 0;
  width: ${THUMB_IMAGE_WIDTH}px;
  height: 96px;
  border-radius: 10px;
  border: 1px solid
    ${({ active }) => (active ? theme.colors.neutralDisable : 'transparent')};
  background: #fff;
  cursor: pointer;
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    border: 1px solid ${theme.colors.neutralPrimary};
  }
`;

const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
