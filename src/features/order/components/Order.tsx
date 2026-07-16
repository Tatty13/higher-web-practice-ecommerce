import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  Button,
  Flex,
  Form,
  Input,
  Radio,
  Space,
  Typography,
  Row,
  Col,
  Select,
  notification,
  type SelectProps,
} from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { BasketImage, PlusIcon } from '@/assets';
import { Card, Divider, Loader } from '@/uiKit';
import { selectorsAuth } from '@/features/auth';
import { useAppSelector } from '@/store';
import { theme } from '@/theme/styledTheme';
import utils from '@/utils';
import type { CityOption, PickupPoint } from '@/types';

import { helpersOrder } from '../helpers';
import type { FormOrderValues } from '../types';
import { PickupPointModal } from './PickupPointModal';

export const Order: FC = () => {
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<FormOrderValues>();

  const [isShowPickupPointMap, setIsShowPickupPointMap] = useState(false);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<PickupPoint>();

  const userId = useAppSelector(selectorsAuth.userId);

  const { data: user } = api.user.useGetUserQuery(userId ?? skipToken);

  const {
    data: cart,
    isLoading: isLoadingCart,
    isError: isErrorGetCart,
  } = api.cart.useGetCartQuery();

  const { data: cities, isLoading: isLoadingCities } =
    api.location.useGetCitiesQuery();
  const [
    createOrder,
    { isLoading: isCreatingOrder, isError: isErrorCreateOrder },
  ] = api.order.useCreateOrderMutation();
  const [deleteCart, { isLoading: isLoadingDeleteCart }] =
    api.cart.useDeleteCartMutation();

  const { items: cartItems, totalPrice = 0, totalItems = 0 } = cart || {};

  const deliveryMethod = Form.useWatch('deliveryMethod', form);
  const pickupPointId = Form.useWatch('pickupPointId', form);

  const addNewCard = () => {
    notificationApi.info({
      message: 'Функциональность добавления новой карты в разработке (stub)',
    });
  };

  const filterCityOption: SelectProps<string, CityOption>['filterOption'] = (
    input,
    option,
  ) =>
    String(option?.label ?? '')
      .toLowerCase()
      .includes(input.toLowerCase());

  const showPickupPointMap = () => {
    setIsShowPickupPointMap(true);
  };

  const closePickupPointMap = () => {
    setIsShowPickupPointMap(false);
  };

  const confirmPickupPoint = (pickupPoint: PickupPoint) => {
    setSelectedPickupPoint(pickupPoint);
    form.setFieldValue('pickupPointId', pickupPoint.id);
  };

  const submitForm = async () => {
    const formValues = form.getFieldsValue();
    try {
      if (!user || !cartItems?.length) {
        return;
      }

      await form.validateFields();

      const requestData = helpersOrder.buildCreateOrderPayload({
        user,
        cartItems,
        formValues,
        totalPrice,
      });
      const createdOrder = await createOrder(requestData).unwrap();

      if (isErrorCreateOrder) {
        notificationApi.error({
          message: 'Произошла ошибка при создании заказа',
          description: 'Попробуйте повторить позднее',
        });

        return;
      }

      await deleteCart();

      navigate(ROUTE_PATHS.orderConfirm, {
        replace: true,
        state: {
          order: createdOrder,
        },
      });
    } catch {
      const isPickupPointDeliveryMethod =
        formValues?.deliveryMethod === 'pickup_point';

      if (isPickupPointDeliveryMethod && !formValues?.pickupPointId) {
        notificationApi.error({
          message: 'Выберите пункт выдачи',
        });
      }
    }
  };

  if (isLoadingCart) {
    return <Loader />;
  }

  if (isErrorGetCart) {
    return (
      <Space
        direction='vertical'
        size={16}
        align='center'>
        <Typography.Title level={4}>
          Не удалось загрузить корзину
        </Typography.Title>
        <Button
          onClick={() => window.location.reload()}
          size='large'>
          Повторить
        </Button>
      </Space>
    );
  }

  return (
    <Content vertical>
      {contextHolder}
      <Row gutter={[20, 34]}>
        <Col
          sm={{ flex: '100%' }}
          md={{ flex: '100%' }}
          lg={{ flex: '60%' }}>
          <Form
            form={form}
            layout='vertical'>
            <Flex
              vertical
              gap='large'>
              <Card
                vertical
                padding='medium'
                gap={20}>
                <Typography.Title level={3}>Способ оплаты</Typography.Title>
                <Form.Item
                  name='paymentMethod'
                  initialValue='card_online'
                  rules={[utils.validation.VALIDATION_RULES.required]}
                  noStyle>
                  <Radio.Group size='large'>
                    <Flex
                      vertical
                      gap='small'>
                      <Flex
                        wrap
                        gap='small'>
                        <RadioButton value='card_online'>
                          Картой онлайн
                        </RadioButton>
                        <RadioButton value='card_on_delivery'>
                          Картой при получении
                        </RadioButton>
                        <AddNewCardBtn
                          icon={<PlusIcon />}
                          iconPosition='end'
                          size='large'
                          color='default'
                          variant='outlined'
                          onClick={addNewCard}>
                          Новая карта
                        </AddNewCardBtn>
                      </Flex>
                      <RadioButton value='cash'>
                        Наличными при получении
                      </RadioButton>
                    </Flex>
                  </Radio.Group>
                </Form.Item>
              </Card>
              <Card
                vertical
                padding='medium'
                gap={20}>
                <Typography.Title level={3}>Способ доставки</Typography.Title>
                <Form.Item
                  name='deliveryMethod'
                  initialValue='courier'
                  rules={[utils.validation.VALIDATION_RULES.required]}
                  noStyle>
                  <Radio.Group size='large'>
                    <Flex
                      wrap
                      gap='small'>
                      <RadioButton
                        value='courier'
                        stretch>
                        Курьером
                      </RadioButton>
                      <RadioButton
                        value='pickup_point'
                        stretch>
                        В пункт выдачи
                      </RadioButton>
                    </Flex>
                  </Radio.Group>
                </Form.Item>

                {deliveryMethod === 'courier' ? (
                  <Flex
                    align='flex-end'
                    gap='small'>
                    <Form.Item
                      name='deliveryCity'
                      label='Доставить по адресу:'
                      rules={[utils.validation.VALIDATION_RULES.required]}>
                      <Select
                        showSearch
                        placeholder='Город'
                        options={cities}
                        filterOption={filterCityOption}
                        loading={isLoadingCities}
                        notFoundContent='Город не найден'
                        size='large'
                      />
                    </Form.Item>
                    <Form.Item
                      name='deliveryAddress'
                      rules={[utils.validation.VALIDATION_RULES.required]}
                      style={{ flex: 1 }}>
                      <Input
                        size='large'
                        placeholder='улица, дом, квартира'
                      />
                    </Form.Item>
                  </Flex>
                ) : (
                  <Flex
                    gap='small'
                    align='center'>
                    <Button
                      size='large'
                      onClick={showPickupPointMap}>
                      Выбрать на карте
                    </Button>
                    <Form.Item
                      name='pickupPointId'
                      rules={[
                        { required: true, message: 'Выберите пункт выдачи' },
                      ]}
                      hidden>
                      <Input />
                    </Form.Item>
                    <Flex vertical>
                      <Typography.Text>
                        {selectedPickupPoint?.address}
                      </Typography.Text>
                      <Typography.Text
                        type='secondary'
                        style={{ fontSize: '14px' }}>
                        {selectedPickupPoint?.workTime}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                )}

                <Flex gap='small'>
                  <Typography.Text type='secondary'>Доставят</Typography.Text>
                  <Typography.Text>
                    {helpersOrder.getFakeDeliveryTime()}
                  </Typography.Text>
                </Flex>
              </Card>
              <Card
                vertical
                padding='medium'
                gap={20}>
                <Typography.Title level={3}>Получатель</Typography.Title>
                <Flex
                  gap='large'
                  align='start'
                  justify='space-between'>
                  <Flex
                    vertical
                    justify='center'
                    gap='small'>
                    <Typography.Text>
                      {user?.firstName} {user?.lastName}
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                      {user?.email}
                    </Typography.Text>
                  </Flex>

                  <Form.Item
                    name='phone'
                    label='Номер телефона'
                    rules={[
                      utils.validation.VALIDATION_RULES.required,
                      {
                        pattern: utils.validation.REGEXP.phone,
                        message: 'Введите 11 цифр номера телефона',
                      },
                    ]}>
                    <Input placeholder='+7' />
                  </Form.Item>
                </Flex>
                <Form.Item
                  name='comment'
                  label='Комментарий к заказу'>
                  <Input.TextArea
                    rows={6}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
              </Card>
            </Flex>
          </Form>
        </Col>

        <Col
          sm={{ flex: '100%' }}
          md={{ flex: '60%' }}
          lg={{ flex: '40%' }}>
          <Card
            vertical
            padding='medium'
            gap='middle'>
            <TextContainer
              align='center'
              justify='space-between'
              gap='small'>
              <Typography.Title level={3}>Ваш заказ</Typography.Title>
              <Typography.Text type='secondary'>
                {utils.declension.getProductCountDescription(totalItems)}
              </Typography.Text>
            </TextContainer>
            <TextContainer
              align='center'
              justify='space-between'
              gap='small'>
              <Typography.Text type='secondary'>Сумма заказа</Typography.Text>
              <Typography.Title level={3}>
                {utils.finance.getFormatPriceWithCurrency(totalPrice)}
              </Typography.Title>
            </TextContainer>
            <TextContainer
              align='center'
              justify='space-between'
              gap='small'>
              <Typography.Text type='secondary'>
                Стоимость доставки
              </Typography.Text>
              <Typography.Title
                level={3}
                type='success'>
                бесплатно
              </Typography.Title>
            </TextContainer>
            <Divider />
            <TextContainer
              align='center'
              justify='space-between'
              gap='small'>
              <Typography.Text type='secondary'>Итого</Typography.Text>
              <Typography.Title
                level={2}
                type='success'>
                {utils.finance.getFormatPriceWithCurrency(totalPrice)}
              </Typography.Title>
            </TextContainer>
            <Button
              size='large'
              type='primary'
              disabled={isCreatingOrder || isLoadingDeleteCart}
              loading={isCreatingOrder || isLoadingDeleteCart}
              onClick={submitForm}>
              Подтвердить
            </Button>
          </Card>
        </Col>
      </Row>
      <PickupPointModal
        open={isShowPickupPointMap}
        selectedPickupPointId={pickupPointId}
        onCancel={closePickupPointMap}
        onSelectPickupPoint={confirmPickupPoint}
      />
    </Content>
  );
};

const Content = styled(Flex)`
  height: 100%;
  background: url(${BasketImage}) right 0 bottom 0 / 40% no-repeat;
`;

const TextContainer = styled(Flex)`
  width: 100%;
`;

const RadioButton = styled(Radio.Button)<{ stretch?: boolean }>`
  width: max-content;
  flex: ${({ stretch }) => (stretch ? 1 : 'unset')};
  border-radius: 8px;
  text-align: center;
`;

const AddNewCardBtn = styled(Button)`
  color: ${theme.colors.neutralPrimary};
  border-color: ${theme.colors.neutralDisable};
`;
