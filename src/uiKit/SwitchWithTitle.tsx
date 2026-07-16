import type { FC } from 'react';
import { Flex, Switch, Typography, type SwitchProps } from 'antd';

type SwitchWithTitleProps = SwitchProps & {
  title: string;
};

export const SwitchWithTitle: FC<SwitchWithTitleProps> = ({
  title,
  ...switchProps
}) => {
  return (
    <Flex gap='small'>
      <Switch {...switchProps} />
      <Typography.Text>{title}</Typography.Text>
    </Flex>
  );
};
