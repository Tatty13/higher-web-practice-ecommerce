import { useState, type FC } from 'react';
import { Avatar, Button, notification, Upload, type UploadProps } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { UserIcon } from '@/assets';
import { theme } from '@/theme/styledTheme';

type AvatarUploadProps = {
  size?: number;
  value?: string;
  onChange?: (imageUrl: string) => void;
};

export const AvatarUpload: FC<AvatarUploadProps> = ({
  size = 80,
  value,
  onChange,
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(value);
  const [notificationApi, contextHolder] = notification.useNotification();

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isImage = file.type.startsWith('image/');

    if (isImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(result);
        onChange?.(result);
      };
      reader.readAsDataURL(file);
    } else {
      notificationApi.error({
        message: 'Можно загружать только изображения',
      });
    }
  };

  return (
    <AvatarWrapper>
      {contextHolder}
      <StyledAvatar
        size={size}
        src={imageUrl}
        icon={<UserIcon />}
      />
      <UploadWrapper>
        <Upload
          showUploadList={false}
          beforeUpload={beforeUpload}>
          <Button
            type='primary'
            shape='circle'
            size='large'
            icon={<CameraOutlined />}
          />
        </Upload>
      </UploadWrapper>
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${theme.colors.bgShadows};
  object-fit: cover;
`;

const UploadWrapper = styled.div`
  position: absolute;
  display: inline;
  right: -20px;
  bottom: 0;
  width: 40px;
  height: 40px;
`;
