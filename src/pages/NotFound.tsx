import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Typography } from 'antd';
import styled from 'styled-components';

import { NotFoundIcon } from '@/assets';
import { ROUTE_PATHS } from '@/app/paths';
import { theme } from '@/theme/styledTheme';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Flex
      align='center'
      justify='center'>
      <Card>
        <TextBlock
          vertical
          gap='middle'>
          <ErrorCode>404</ErrorCode>
          <Typography.Title level={1}>Страница не найдена</Typography.Title>
          <Typography.Paragraph type='secondary'>
            Похоже, такой страницы больше нет или ссылка была указана неверно.
            Вернитесь на главную, чтобы продолжить просмотр каталога.
          </Typography.Paragraph>

          <Flex
            wrap
            gap='middle'>
            <Button
              type='primary'
              size='large'
              onClick={() => navigate(ROUTE_PATHS.main)}>
              На главную
            </Button>

            <Button
              size='large'
              onClick={() => navigate(-1)}>
              Назад
            </Button>
          </Flex>
        </TextBlock>

        <IconContainer
          align='center'
          justify='center'>
          <NotFoundIcon />
        </IconContainer>
      </Card>
    </Flex>
  );
};

const mediaMobileWidth = 'max-width: 700px';

const Card = styled.div`
  width: 100%;
  max-width: 760px;
  min-height: 440px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 34px;

  @media screen and (${mediaMobileWidth}) {
    grid-template-columns: 1fr;
  }
`;

const TextBlock = styled(Flex)`
  max-width: 420px;

  @media screen and (${mediaMobileWidth}) {
    align-items: center;
    text-align: center;
    max-width: 100%;
  }
`;

const ErrorCode = styled.div`
  font-size: 88px;
  line-height: 0.95;
  font-weight: 700;
  color: ${theme.colors.accentSecondary};
  letter-spacing: -0.04em;
`;

const IconContainer = styled(Flex)`
  max-height: 270px;
`;
