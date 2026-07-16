type Declensions = {
  one: string;
  two: string;
  many: string;
};

export const getDeclensionWithCount = ({
  count,
  declensions,
}: {
  count: number;
  declensions: Declensions;
}): string => {
  const absCount = Math.abs(count);
  const lastTwo = absCount % 100;
  const lastOne = absCount % 10;

  let word: string;

  if (lastTwo >= 11 && lastTwo <= 14) {
    word = declensions.many;
  } else if (lastOne === 1) {
    word = declensions.one;
  } else if (lastOne >= 2 && lastOne <= 4) {
    word = declensions.two;
  } else {
    word = declensions.many;
  }

  return `${count} ${word}`;
};

export const getProductCountDescription = (count: number): string => {
  return getDeclensionWithCount({
    count,
    declensions: {
      one: 'товар',
      two: 'товара',
      many: 'товаров',
    },
  });
};
