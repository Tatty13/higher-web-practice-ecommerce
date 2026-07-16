import { type FC } from 'react';

import { Space, Typography, Modal, Alert, List, type ModalProps } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { Card } from '@/uiKit';

import { theme } from '@/theme/styledTheme';
import type { PickupPoint } from '@/types';

type PickupPointModalProps = {
  open: boolean;
  selectedPickupPointId: string;
  onCancel: ModalProps['onCancel'];
  onSelectPickupPoint: (pickupPoint: PickupPoint) => void;
};

export const PickupPointModal: FC<PickupPointModalProps> = ({
  open,
  selectedPickupPointId,
  onCancel,
  onSelectPickupPoint,
}) => {
  const {
    data: pickupPoints,
    isLoading: isLoadingPickupPoints,
    isError: isErrorPickupPoints,
  } = api.location.useGetPickupPointsQuery();

  return (
    <Modal
      title='Выбор пункта выдачи'
      open={open}
      onCancel={onCancel}
      loading={isLoadingPickupPoints}
      footer={null}
      width='80%'>
      <ModalContent>
        <MapStub>Карта пунктов выдачи</MapStub>

        {isErrorPickupPoints && (
          <Alert
            type='error'
            message='Не удалось загрузить пункты выдачи'
            showIcon
          />
        )}

        {!isErrorPickupPoints && (
          <List
            dataSource={pickupPoints}
            rowKey='id'
            split={false}
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
              padding: '0 14px',
            }}
            renderItem={(pickupPoint) => {
              const isActive = pickupPoint.id === selectedPickupPointId;

              return (
                <List.Item onClick={() => onSelectPickupPoint(pickupPoint)}>
                  <Card
                    vertical
                    hoverable
                    active={isActive}
                    padding='medium'>
                    <Typography.Title level={3}>
                      {pickupPoint.name}
                    </Typography.Title>

                    <Space />
                    <Typography.Text>{pickupPoint.address}</Typography.Text>
                    <Typography.Text type='secondary'>
                      {pickupPoint.workTime}
                    </Typography.Text>
                  </Card>
                </List.Item>
              );
            }}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MapStub = styled.div`
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.bgShadows};
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(47, 84, 235, 0.04),
    rgba(47, 84, 235, 0.08)
  );
  color: ${theme.colors.neutralPrimary};
`;
